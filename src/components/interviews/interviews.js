import React, { Component } from 'react';
import InterviewItemsConatiner from '../../containers/mutation-container';
import CurrentInterviewSubscription from '../../containers/current-interview-item';
import './interviews.css';

class Interviews extends Component {

	state = {
		interview_id: null,
		updated_at: null,
		passed: 0,
	}

	updateInterviewId = (e) => {
		const now = new Date();
		const isFinished = e[0].interview_user ? new Date(e[0].interview_user.date) : 0;
		let passed = 0;
		if (isFinished) {
			passed = (isFinished.getTime() - (2 * 60 * 60 * 1000)) < now ? 1 : 0;
		}
		this.setState({
			interview_id: e[0].interview_user ? e[0].interview_user.id : null,
			updated_at: e[0] ? e[0].updated_at : null,
			passed: passed ? 1 : 0,
		});
	}

	render() {
		const { interview_id, updated_at, passed } = this.state;
		const { filterStatus } = this.props;
		return (
			<React.Fragment>
				<CurrentInterviewSubscription updateInterviewId={this.updateInterviewId} />
				<div className="interviews-block" >
					<InterviewItemsConatiner interview_id={interview_id} updated_at={updated_at} passed={passed} filterStatus={filterStatus} />
				</div>
			</React.Fragment>
		)
	}
}

export default Interviews;
