import axios from 'axios';
import { globals } from '@config/globals';

export const network = axios.create({
	baseURL: globals.apiUrl,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': 'http://localhost:3000',
	},
	withCredentials: true,
});

network.interceptors.response.use(
	(resposne) => resposne,
	(error) => {
		if (
			error.response.status === 401 &&
			window.location.pathname !== '/register' &&
			window.location.pathname !== '/auth'
		) {
			window.location.replace('/auth');
		}

		throw new Error(error);
	}
);
