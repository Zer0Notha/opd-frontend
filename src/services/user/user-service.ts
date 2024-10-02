import { network } from '@services/network';
import { User } from './interfaces';

export class UserService {
	private static url = '/user';

	static async getMyInfo(): Promise<User> {
		const { data } = await network.get<User>(`${this.url}/info`);

		return data;
	}

	static async getUserById(id: string): Promise<User> {
		const { data } = await network.get<User>(`${this.url}/${id}`);

		return data;
	}
}
