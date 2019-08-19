import React, { Component } from 'react';
import { Subscription, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import toastr from 'toastr';
import { InterviewContainer, InterviewView } from './../interview';
import './interviews.css';

const SUBSCRIPTION_USERS = gql`
subscription {
	interview_view(order_by: {date: asc}) {
	  id
	  title
	  date
	  max_slots
	  registered
	  end_date
	}
  }
`;

const UPDATE_USER_INTERVIEW = gql`
  mutation update_interview_id ($user_id: Int!, $interview_id: Int) {
	update_users(where: {user_id: {_eq: $user_id}}, _set: {interview_id: $interview_id}) {
	  affected_rows
	}
  }
`

const SUBSCRIPTION_USER_INTERVIEW = gql`
subscription {
	users {
	  interview_user {
		date
		hours
		id
		max_slots
		registered
		title
		end_date
	  }
	}
  }
`

const parseJwt = (token) => {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
};

const CurrentInterviewItem = ({ hasura_id, interview, updateUserInterview }) => {
	return (
		<div className="interviews-item current"
			onClick={() => {
				updateUserInterview({ variables: { user_id: hasura_id, interview_id: null } })
					.then(() => {
						toastr.success('Хм, успел? Молодец!')
					}).catch(() => {
						toastr.error('Полно уже, друже')
					})
			}}>
			<InterviewContainer interview={interview} current={1} />
			<div className="interview-subscription">
				<button className="btn btn-outline-danger">
					<i className="fa fa-minus-circle"></i>
				</button>
			</div>
		</div>
	)
}

const InterviewItem = ({ hasura_id, interview, updateUserInterview }) => {
	return (
		<div className="interviews-item"
			onClick={() => {
				updateUserInterview({ variables: { user_id: hasura_id, interview_id: interview.id } })
					.then(() => {
						toastr.success('Хм, успел? Молодец!')
					}).catch(() => {
						toastr.error('Полно уже, друже')

					})
			}}>
			<InterviewContainer interview={interview} />
			<div className="interview-subscription">
				<button className="btn btn-outline-success">
					<i className="fa fa-plus-circle"></i>
				</button>
			</div>
		</div>
	)
}

const InterviewsList = ({ interview_id }) => {
	const user_id = localStorage.getItem("jwt");
	const data = parseJwt(user_id);
	const hasura_id = data["https://hasura.io/jwt/claims"]["x-hasura-user-id"];

	return (
		<Mutation mutation={UPDATE_USER_INTERVIEW}>
			{(updateUserInterview) => {
				return (
					<Subscription subscription={SUBSCRIPTION_USERS}>
						{({ loading, error, data }) => {
							if (loading) {
								return (<span>loading...</span>);
							}
							if (error) {
								return (<span>error...</span>);
							}
							return (
								data.interview_view.map((interview) => {
									if (interview_id === interview.id) {
										return (
											<CurrentInterviewItem
												key={interview.id}
												hasura_id={hasura_id}
												interview={interview}
												updateUserInterview={updateUserInterview} />
										);
									}
									let interview_date = new Date(interview.date);
									if ((new Date()).getTime() > interview_date) {
										return null;
									}
									return (
										<InterviewItem
											key={interview.id}
											hasura_id={hasura_id}
											interview={interview}
											updateUserInterview={updateUserInterview} />
									)
								})
							)
						}
						}
					</Subscription>
				)
			}
			}
		</Mutation>
	)
}

const CurrentInterviewView = ({ updateInterviewId }) => {
	return (
		<Subscription subscription={SUBSCRIPTION_USER_INTERVIEW}
			onSubscriptionData={(e) => { updateInterviewId(e.subscriptionData.data.users) }}>
			{
				({ loading, error }) => {
					if (loading) {
						return (<span>loading...</span>);
					}
					if (error) {
						return (<span>error...</span>);
					}
					return null
				}
			}
		</Subscription>
	)
}

class Interviews extends Component {

	state = {
		registered: 0,
		interview_id: null,
	}

	updateInterviewId = (e) => {
		this.setState({
			interview_id: e[0].interview_user ? e[0].interview_user.id : null
		});
	}

	updateRegisteredStatus = (e) => {
		let interview_user = e.subscriptionData.data.users[0].interview_user;
		this.setState({
			registered: interview_user ? 1 : 0,
		});
	}

	render() {
		const interviewsHeader = {
			title: "Title",
			StartTime: "Time Interval",
			DateOfInterview: "Date",
			registered: "Registered",
			max_slots: "Max Slots"
		};

		return (
			<React.Fragment>
				<CurrentInterviewView updateInterviewId={this.updateInterviewId} />

				<div className="interviews-block" >
					<div className="interviews-item">
						<InterviewView data={interviewsHeader} />
						<div className="interview-subscription">
						</div>
					</div>

					<InterviewsList interview_id={this.state.interview_id} />
				</div>
			</React.Fragment>
		)
	}
}

export default Interviews;