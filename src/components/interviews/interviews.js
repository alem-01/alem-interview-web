import React, { Component } from 'react';
import InterviewItemsConatiner from '../../containers/mutation-container';
import CurrentInterviewSubscription from '../../containers/current-interview-item';
import Info from '../info';
import './interviews.css';

class Interviews extends Component {

	state = {
		registered: 0,
		interview_id: null,
		updated_at: null,
	}

	updateInterviewId = (e) => {
		this.setState({
			interview_id: e[0].interview_user ? e[0].interview_user.id : null,
			updated_at: e[0] ? e[0].updated_at : null
		});
	}

	updateRegisteredStatus = (e) => {
		let interview_user = e.subscriptionData.data.users[0].interview_user;
		this.setState({
			registered: interview_user ? 1 : 0,
		});
	}

	render() {
		return (
			<React.Fragment>
				<CurrentInterviewSubscription updateInterviewId={this.updateInterviewId} />
				<Info logout={this.props.logout} />
				<div className="interviews-block" >
					<InterviewItemsConatiner interview_id={this.state.interview_id} updated_at={this.state.updated_at} />
				</div>
			</React.Fragment>
		)
	}
}

export default Interviews;
