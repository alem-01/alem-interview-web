import React from 'react';
import './info.css';

const Info = ({ logout }) => {
	return (
		<div className="wrapper">
			<div className="info">
				<div className="info-item">
					Welcome, Cadet!?
				</div>
			</div>
			<div className="exit">
				<div className="exit-button">
					<button className="btn btn-outline-danger"
						onClick={() => logout()}
					>
						<i className="fa fa-sign-out"></i>
					</button>
				</div>
			</div>
		</div>
	)
}

export default Info;