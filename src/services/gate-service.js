import { config } from '../config';

export default class GateService {
	_gateBase = config.url.GATE_BASE;

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

	refreshToken = async (token) => {
		const res = await fetch(`${this._gateBase}/auth/refresh`, {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ jwt_token: token })
		});

		const r = await res.json();
		return r;
	}
}