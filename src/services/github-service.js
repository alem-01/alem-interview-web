import { config } from '../config';

export default class GithubService {
	_gateBase = config.url.GATE_BASE;
	_apiBase = config.url.API_BASE;

	generateJwtToken = async () => {
		const code = localStorage.getItem('token');
		const res = await fetch(`${this._gateBase}generateToken?code=${code}`);

		if (!res.ok) {
			throw new Error(`Could not fetch ${this._gateBase}: ${res.status}`);
		};

		const r = await res.json();
		console.log(r);
		return r
	};

	getToken = async (code) => {
		const res = await fetch(`${this._gateBase}/auth/?code=${code}`);

		if (!res.ok) {
			return {
				hint: 'Internal Server Error',
			}
		};
		const r = await res.json();
		return r;
	}

	getResourse = async (url) => {
		const res = await fetch(`${this._apiBase}${url}`, {
			headers: {
				'Authorization': `token ${this._token}`,
			}
		});
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}` +
				`, received ${res.status}`)
		}
		return await res.json();
	}

	getUser = async () => {
		const user = await this.getResourse("/user");
		return this._transformUser(user);
	}

	_transformUser = (user) => {
		return {
			avatar_url: user.avatar_url,
			bio: user.bio,
			login: user.login,
		}
	}
}