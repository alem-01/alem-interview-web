import React from 'react';
import toastr from 'toastr';
import { InterviewContainer } from './../components/interview';
import { config } from '../config';

import { Subscription, Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '../components/loading';

const SUBSCRIPTION_USERS = gql`
subscription {
	interview_view(order_by: {date: asc}) {
	  id
	  title
	  date
	  max_slots
	  registered
	  end_date
	  online
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

const parseJwt = (token) => {
	var base64Url = token.split('.')[1];
	var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
	var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
		return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
	}).join(''));

	return JSON.parse(jsonPayload);
};

const InterviewItem = ({ hasura_id, interview, updateUserInterview, interview_date }) => {
	let now = new Date();
	const interview_time = new Date(interview_date.getTime() - config.time);
	const expired = now > interview_time;
	return (
		<div className="interviews-item"
			onClick={() => {
				if (expired) {
					return;
				}
				let s = window.confirm("Confirm!");
				if (!s) {
					return
				}
				updateUserInterview({ variables: { user_id: hasura_id, interview_id: interview.id } })
					.then(() => {
						toastr.success('Subscribed!')
					}).catch(() => {
						toastr.error('It`s full!')
					})
			}}>
			<InterviewContainer interview={interview} />
			<InterviewSubscribeButton expired={expired} />
		</div>
	)
}

const InterviewSubscribeButton = ({ expired, current }) => {
	const Button = current ?
		<button className="btn btn-outline-danger"><i className="fa fa-minus-circle"></i></button> :
		<button className="btn btn-outline-success"><i className="fa fa-plus-circle"></i></button>;
	const ButtonBox = expired ? null : Button
	return (
		<div className="interview-subscription">
			{ButtonBox}
		</div>
	)
}

const CurrentInterviewItem = ({ hasura_id, interview, updateUserInterview, interview_date }) => {
	let now = new Date();
	const interview_time = new Date(interview_date.getTime() - config.time);
	const expired = now > interview_time;
	return (
		<div className="interviews-item current"
			onClick={() => {
				if (expired) {
					return;
				}
				let s = window.confirm("Confirm!");
				if (!s) {
					return
				}
				updateUserInterview({ variables: { user_id: hasura_id, interview_id: null } })
					.then(() => {
						toastr.success('Unsubscribed!')
					}).catch(() => {
						toastr.error('It`s full')
					})
			}}>
			<InterviewContainer interview={interview} current={1} />
			<InterviewSubscribeButton expired={expired} current={1} />
		</div>
	)
}

const InterviewItemsConatiner = ({ interview_id }) => {
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
								return (
									<div className="interviews-item">
										<Loading />
									</div>
								);
							}
							if (error) {
								return (
									<div className="interviews-item">
										error...
									</div>);
							}
							return (
								data.interview_view.map((interview) => {
									let interview_date = new Date(interview.date);
									if (interview_id === interview.id) {
										return (
											<CurrentInterviewItem
												key={interview.id}
												hasura_id={hasura_id}
												interview={interview}
												updateUserInterview={updateUserInterview}
												interview_date={interview_date} />
										);
									}
									if ((new Date()) > interview_date) {
										return null;
									}
									return (
										<InterviewItem
											key={interview.id}
											hasura_id={hasura_id}
											interview={interview}
											updateUserInterview={updateUserInterview}
											interview_date={interview_date} />
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

export default InterviewItemsConatiner;