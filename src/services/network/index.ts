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
