import { User } from '@services/user';
import { LoginInfo, RegisterInfo } from './interfaces';
import { network } from '@services/network';

export class AuthService {
	private static url = '/auth';

	static async register(args: RegisterInfo): Promise<User> {
		const { data } = await network.post<User>(`${this.url}/register`, {
			data: {
				...args,
			},
		});

		return data;
	}

	static async login(args: LoginInfo): Promise<User> {
		const { data } = await network.post<User>(`${this.url}/login`, {
			data: {
				...args,
			},
		});

		return data;
	}
}
