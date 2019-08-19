import React, { Component } from 'react';
import { Subscription, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import toastr from 'toastr';
import Interview from './../interview';
import './interviews.css';

const SUBSCRIPTION_USERS = gql`
subscription {
	interview_view {
	  id
	  title
	  date
	  max_slots
	  registered
	}
  }
`;

const UPDATE_USER_INTERVIEW = gql`
  mutation update_interview_id ($id: Int!, $interview_id: Int) {
	update_users(where: {id: {_eq: $id}}, _set: {interview_id: $interview_id}) {
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
	  }
	}
  }
`

const InterviewsList = ({ registered }) => {
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
									let interview_date = new Date(interview.date);
									if ((new Date()).getTime() > interview_date) {
										return null;
									}
									return (
										<div className="interviews-item" key={interview.id}
											onClick={() => {
												if (registered) {
													toastr.error('Вначале отпишись от прошлой')
													return;
												}
												updateUserInterview({ variables: { id: 1, interview_id: interview.id } })
													.then(() => {
														toastr.success('Хм, успел? Молодец!')
													}).catch(() => {
														toastr.error('Полно уже, друже')

													})

											}}>
											<Interview interview={interview} />
										</div>
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

const CurrentInterview = ({ updateRegisteredStatus }) => {
	// if current_interview - 12 < now => dont set mutation, only subscribe
	// else render mutation with subscritp
	return (
		<Mutation mutation={UPDATE_USER_INTERVIEW}>
			{(updateUserInterview) => {
				return (
					<Subscription subscription={SUBSCRIPTION_USER_INTERVIEW}
						onSubscriptionData={(e) => { updateRegisteredStatus(e) }}>
						{
							({ loading, error, data }) => {
								if (loading) {
									return (<span>loading...</span>);
								}
								if (error) {
									return (<span>error...</span>);
								}
								return (
									data.users.map((interview) => {
										if (!interview.interview_user) {
											return null;
										}
										return (
											<div className="interviews-item current" key={interview.interview_user.id}
												onClick={() => {
													const time = new Date(interview.interview_user.date);
													time.setTime(time.getTime() - (12 * 60 * 60 * 1000));
													const current = new Date();
													if (current > time) {
														return;
													}
													updateUserInterview({ variables: { id: 1, interview_id: null } })
														.then(() => {
															toastr.success('Ты уже уходишь, так быстро?')
														}).catch(() => {
															toastr.error('Ты уже уходишь, так быстро?')
														})
												}}>
												<Interview interview={interview.interview_user} current={1} />
											</div>
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

class Interviews extends Component {

	state = {
		registered: 0
	}

	updateRegisteredStatus = (e) => {
		let interview_user = e.subscriptionData.data.users[0].interview_user;
		this.setState({
			registered: interview_user ? 1 : 0,
		});
	}


	// componentDidUpdate = ()
	render() {
		return (
			<React.Fragment>

				<div className="interview-current">
					<CurrentInterview updateRegisteredStatus={this.updateRegisteredStatus} registered={this.state.registered} />
				</div>

				<div className="interviews-block" >
					<div className="interviews-item">
						<div className="interview-body">
							<div className="interview-title">Title</div>
							<div className="interview-date">
								Date
						</div>
							<div className="interview-slots">
								<span className="interview-registered">Registered/Max slots</span>
							</div>
						</div>
					</div>

					<InterviewsList registered={this.state.registered} />
				</div>
			</React.Fragment>
		)
	}
}

export default Interviews;