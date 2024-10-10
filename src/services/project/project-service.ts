import { network } from '@services/network';
import {
	CreateProject,
	CreateProjectReport,
	Project,
	ProjectListProps,
	ProjectListResponse,
	ProjectReport,
	ProjectUsersResponse,
	UpdateProject,
} from './interfaces';

export class ProjectService {
	private static url = '/project';

	static async getList(args: ProjectListProps): Promise<ProjectListResponse> {
		const { data } = await network.get<ProjectListResponse>(
			`${this.url}/list?status=${args.status}&type=${args.type}`
		);

		return data;
	}

	static async getUserProjects(id: string): Promise<ProjectListResponse> {
		const { data } = await network.get<ProjectListResponse>(
			`${this.url}/user/${id}`
		);

		return data;
	}

	static async getProject(id: string): Promise<Project> {
		const { data } = await network.get<Project>(`${this.url}/${id}`);

		return data;
	}

	static async getProjectUsers(id: string): Promise<ProjectUsersResponse> {
		const { data } = await network.get<ProjectUsersResponse>(
			`${this.url}/get-users/${id}`
		);

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

	static async createProjectReport(
		args: CreateProjectReport
	): Promise<ProjectReport> {
		const formData = new FormData();

		formData.append('file', args.file, args.file.name);

		const { data } = await network.post<ProjectReport>(
			`${this.url}/create-report/${args.projectId}`,
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

	static async updateProject(args: UpdateProject): Promise<Project> {
		const { data } = await network.post<Project>(
			`${this.url}/update/${args.id}`,
			{
				...args,
			}
		);

		return data;
	}

	static async approveProject(id: string): Promise<void> {
		await network.post<void>(`${this.url}/approve/${id}`);
	}

	static async rejectProject(id: string): Promise<void> {
		await network.post<void>(`${this.url}/reject/${id}`);
	}
}
