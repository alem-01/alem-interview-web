import React from 'react';
import App from '../app';
import Login from '../login';
import Callback from './callback';
import GateService from '../../services/gate-service';
import toastr from 'toastr';
import { config } from '../../config';

export default class Auth extends React.Component {

	gateService = new GateService();

	state = {
		isAuthenticated: false,
	};

	handleAuthentication = (code) => {
		this.setState({ isAuthenticated: 'loading' });

		this.gateService.getToken(code)
			.then((resp) => {
				if (resp.hint) {
					toastr.error(resp.hint);
				}
				this.setSession(resp);
			})
	};

	refreshToken = (token) => {
		this.setState({ isAuthenticated: 'loading' });

		this.gateService.refreshToken(token)
			.then((resp) => {
				if (resp.hint) {
					toastr.error(resp.hint);
				}
				this.setSession(resp)
			})
	}

	setSession({ jwt_token }) {
		if (!jwt_token) {
			this.setState({
				isAuthenticated: false
			});
			return;
		}
		localStorage.setItem('isLoggedIn', 'true');
		localStorage.setItem('jwt', jwt_token)

		window.location.replace(config.url.LOGOUT);

		this.setState({
			isAuthenticated: true,
		});
	}

	logout = () => {
		localStorage.removeItem('isLoggedIn');
		localStorage.removeItem('jwt');
		window.location.replace(config.url.LOGOUT);
		this.setState({
			isAuthenticated: false,
		});
	}

	parseJwt = (token) => {
		let base64Url = token.split('.')[1];
		let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
		let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
			return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
		}).join(''));

		return JSON.parse(jsonPayload);
	};

	isExpired = (token) => {
		if (!token) {
			return
		}
		const jwt = this.parseJwt(token);
		if (jwt) {
			const date = new Date(jwt.exp * 1000);
			if (date < new Date()) {
				return true;
			}
		}
		return false;
	}

	componentDidMount() {
		const url = new URL(window.location.href);
		const code = url.searchParams.get("code")
		if (code) {
			this.handleAuthentication(code);
		}
		const token = localStorage.getItem('jwt');
		const isExpired = this.isExpired(token);
		if (token && !isExpired) {
			this.setState({
				isAuthenticated: true,
			})
			return;
		}
		if (isExpired) {
			this.refreshToken(token);
		}
	}

	render() {
		if (this.state.isAuthenticated === 'loading') {
			return (<Callback {...this.props} />);
		}

		if (!this.state.isAuthenticated) {
			return (<Login loginHandler={this.login} />);
		}

		return (<App {...this.props} auth={{ ...this.state, logout: this.logout }} />);
	}

}
