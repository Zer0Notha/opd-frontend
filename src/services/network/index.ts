import axios from "axios";
import { globals } from "@config/globals";

export const network = axios.create({
	baseURL: globals.apiUrl,
	headers: {
		'Content-Type': 'application/json',
	},
	withCredentials: false,
});
