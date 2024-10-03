import { network } from '@services/network';
import { ProjectListResponse } from './interfaces';

export class ProjectService {
	private static url = '/project';

	static async getList(): Promise<ProjectListResponse> {
		const { data } = await network.get<ProjectListResponse>(`${this.url}/list`);

		return data;
	}
}
