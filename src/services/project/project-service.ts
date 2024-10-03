import { network } from '@services/network';
import { CreateProject, Project, ProjectListResponse } from './interfaces';

export class ProjectService {
	private static url = '/project';

	static async getList(): Promise<ProjectListResponse> {
		const { data } = await network.get<ProjectListResponse>(`${this.url}/list`);

		return data;
	}

	static async createProject(args: CreateProject): Promise<Project> {
		const formData = new FormData();

		formData.append('file', args.file, args.file.name);

		const { data } = await network.post<Project>(
			`${this.url}/create`,
			{
				...args,
			},
			{
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}
		);

		return data;
	}
}
