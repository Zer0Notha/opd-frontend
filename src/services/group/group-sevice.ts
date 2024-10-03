import { network } from '@services/network';
import { GroupResponse } from './interfaces';

export class GroupService {
	private static url = '/group';

	static async getGroups(): Promise<GroupResponse> {
		const { data } = await network.get<GroupResponse>(`${this.url}/list`);

		return data;
	}
}
