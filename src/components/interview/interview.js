import React from 'react';
import Countdown from 'react-countdown-now';
import './interview.css'

const Completionist = () => <span>You are good to go!</span>;

const renderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		return <Completionist />;
	} else {
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

	return (
		<span>
			{`${day} ${monthNames[monthIndex]} ${year}`}
		</span>
	);
}

const formatHoursAndMinutes = (date) => {
	let hours = date.getHours();
	let minutes = date.getMinutes();
	if (hours < 10) { hours = "0" + hours; }
	if (minutes < 10) { minutes = "0" + minutes; }
	return `${hours}:${minutes}`;
}

const InterviewView = ({ data }) => {
	const { title, StartTime, EndTime, DateOfInterview, registered, max_slots } = data;
	return (
		<div className="interview-body">
			<div className="interview-title">{title}</div>
			<div className="interview-time">
				{StartTime} {EndTime}
				<br />
				{DateOfInterview}
			</div>
			<div className="interview-slots">
				<span className="interview-registered">{registered}/</span>
				<span className="interview-max-slots">{max_slots}</span>
			</div>

		</div>
	)
}

const InterviewContainer = ({ interview, current }) => {
	const { date, end_date } = interview
	let interview_date = new Date(date);
	let finish_date = new Date(end_date);
	const DateOfInterview = current ? <Countdown date={interview_date} renderer={renderer} /> : formatDate(interview_date);
	const EndTime = current ? null : formatHoursAndMinutes(finish_date);
	const StartTime = current ? null : formatHoursAndMinutes(interview_date) + " —";
	return (
		<InterviewView data={{ ...interview, DateOfInterview, EndTime, StartTime }} />
	)
}

export {
	InterviewContainer,
	InterviewView
};