import React from 'react';
import App from '../app';
import Login from '../login';
import Callback from './callback';
import GithubService from '../../services/github-service';
import toastr from 'toastr';
import { config } from '../../config';

export default class Auth extends React.Component {

	githubService = new GithubService();

	state = {
		isAuthenticated: false,
	};

	handleAuthentication = (code) => {
		this.setState({ isAuthenticated: 'loading' });

		this.githubService.getToken(code)
			.then((resp) => {
				if (resp.hint) {
					toastr.error(resp.hint);
				}
				this.setSession(resp);
			})
	};

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

	componentDidMount() {
		const url = new URL(window.location.href);
		const code = url.searchParams.get("code")
		if (code) {
			this.handleAuthentication(code);
		}
		if (localStorage.getItem('jwt')) {
			this.setState({
				isAuthenticated: true,
			})
			return;
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
