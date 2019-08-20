import React from 'react';
import './info.css';

const Info = ({ logout }) => {
	return (
		<div className="wrapper">
			<div className="info">
				<div className="info-item">
					<div className="info-title">
						Welcome to register for an interview part!
					</div>
					<div className="info-body">
						You can register on any of the open slots.
						<br />
						If you didn’t manage to register, don’t be upset,
						<br />
						in the near future we will create new slots
					</div>

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