import React, { Component } from 'react';
import './error-indicator.css';

export default class ErrorIndicator extends Component {
	render() {
		return (
			<div className="error-indicator">
				<span className="boom">BOOM</span>
				<span>
					something has gone terribly wrong
				</span>
				<span>
					(but we already fixing this)
				</span>
			</div>
		)
	}
}
