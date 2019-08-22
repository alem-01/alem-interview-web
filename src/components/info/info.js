import React from 'react';
import './info.css';

const Info = ({ logout }) => {
	return (
		<div className="wrapper">
			<div className="info">
				<div className="info-item">
					<div className="info-title">
						<p>Welcome to the Interview <br></br>Registration page!</p>
					</div>
					<div className="info-border">

					</div>
					<div className="info-body">
						You can register on any of the available slots.
						<br />
						If you didn’t manage to register, don’t be upset -
						<br />
						soon, we will create new slots.
						<br />
						P.S. choose dates carefully - to pick another time
						<br />
						for the interview you will have to wait 1 minute.
					</div>

				</div>
			</div>
			<div className="exit">
				<div className="exit-button">
					<button className="logout"
						onClick={() => logout()}
					>
						logout
					</button>
				</div>
			</div>
		</div>
	)
}

export default Info;