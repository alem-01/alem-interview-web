import React, { Component } from 'react';
import { InterviewView } from './../interview';
import InterviewItemsConatiner from '../../containers/mutation-container';
import CurrentInterviewSubscription from '../../containers/current-interview-item';
import Info from '../info';
import './interviews.css';

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
				<CurrentInterviewSubscription updateInterviewId={this.updateInterviewId} />
				<Info logout={this.props.logout} />
				<div className="interviews-block" >
					<div className="interviews-item">
						<InterviewView data={interviewsHeader} />
						<div className="interview-subscription">
						</div>
					</div>
					<InterviewItemsConatiner interview_id={this.state.interview_id} />
				</div>
			</React.Fragment>
		)
	}
}

export default Interviews;