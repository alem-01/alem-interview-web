import React from 'react';
import { Subscription } from 'react-apollo';
import gql from 'graphql-tag';

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
		online
	  }
	}
  }
`

const CurrentInterviewSubscription = ({ updateInterviewId }) => {
	return (
		<Subscription subscription={SUBSCRIPTION_USER_INTERVIEW}
			onSubscriptionData={(e) => { updateInterviewId(e.subscriptionData.data.users) }}>
		</Subscription>
	)
}

export default CurrentInterviewSubscription;