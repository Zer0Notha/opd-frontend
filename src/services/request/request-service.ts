import { network } from '@services/network';
import { ProjectRequestsResponse } from './interfaces';

export class RequestService {
	private static url = '/request';

	static async createRequest(projectId: string): Promise<void> {
		await network.post(`${this.url}/create/${projectId}`);
	}

	static async getProjectRequests(
		projectId: string
	): Promise<ProjectRequestsResponse> {
		const { data } = await network.get<ProjectRequestsResponse>(
			`${this.url}/project/${projectId}`
		);

		return data;
	}

	static async getUserRequests(
		userId: string
	): Promise<ProjectRequestsResponse> {
		const { data } = await network.get<ProjectRequestsResponse>(
			`${this.url}/user/${userId}`
		);

		return data;
	}

	static async approveRequest(requestId: string): Promise<void> {
		await network.post<ProjectRequestsResponse>(
			`${this.url}/approve/${requestId}`
		);
	}

	static async rejectRequest(requestId: string): Promise<void> {
		await network.post<ProjectRequestsResponse>(
			`${this.url}/reject/${requestId}`
		);
	}
}
