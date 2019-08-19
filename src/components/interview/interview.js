import React from 'react';
import Countdown from 'react-countdown-now';
import './interview.css'

const Completionist = () => <span>You are good to go!</span>;

// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		// Render a complete state
		return <Completionist />;
	} else {
		// Render a countdown
		return <span>ммм, всего-то! <br />{days}d : {hours}h : {minutes}:{seconds}</span>;
	}
};

const formatDate = (date) => {
	const monthNames = [
		"January", "February", "March",
		"April", "May", "June", "July",
		"August", "September", "October",
		"November", "December"
	];

	const day = date.getDate();
	const monthIndex = date.getMonth();
	const year = date.getFullYear();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	if (hours < 10) { hours = "0" + hours; }
	if (minutes < 10) { minutes = "0" + minutes; }

	return (
		<span>
			{`${day} ${monthNames[monthIndex]} ${year}`} {`${hours}:${minutes}`}
		</span>
	);
}

const Interview = ({ interview, current }) => {
	const { title, date, registered, max_slots } = interview
	let interview_date = new Date(date);
	const Timer = current ? <Countdown date={interview_date} renderer={renderer} /> : formatDate(interview_date);
	return (
		<div className="interview-body">
			<div className="interview-title">{title}</div>
			<div className="interview-date">
				{Timer}
			</div>
			<div className="interview-slots">
				<span className="interview-registered">{registered}/</span>
				<span className="interview-max-slots">{max_slots}</span>
			</div>

		</div>
	)
}

export default Interview;