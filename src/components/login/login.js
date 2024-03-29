import React from "react";
import './login.css';
import { config } from '../../config';

const CLIENT_ID = config.url.CLIENT_ID;
const REDIRECT_URI = config.url.REDIRECT_URI;

const Login = () => (
	<div className="overlay">
		<div className="background-image"></div>

			<div className="overlay-content">
				<div className="logo"> </div>
					<div className="overlay-action"> 
						<a
							href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}`}>
							<button className="btn auth" >
								Authorize Via Github
							</button>
						</a>
					</div>
			</div>

	</div>
);

export default Login;
