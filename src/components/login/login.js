import React from "react";
import './login.css';

const CLIENT_ID = "208397fc442d1ed91769";
const REDIRECT_URI = "http://localhost:3000/code";

const Login = () => (
	<div className="overlay">
		<div className="overlay-content">
			<div className="overlay-action">
				<a
					href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}>
					<button className="btn btn-success">
						Authorize Via Github
					</button>
				</a>

			</div>
		</div>
	</div>
);

export default Login;
