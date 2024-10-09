export const ProjectRequestStatus = {
	confirmed: 'Подтверждено',
	rejected: 'Отклонено',
	working: 'В работе',
};

export interface ProjectRequest {
	id: string;
	userId: string;
	projectId: string;
	priority: number;
	status: keyof typeof ProjectRequestStatus;
}

export type ProjectRequestsResponse = {
	requests: Array<ProjectRequest>;
};
