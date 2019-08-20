import { config } from '../config';

export default class GithubService {
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
}