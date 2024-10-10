import { Project } from '@services/project';

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
	project: Project;
}

export type ProjectRequestsResponse = {
	requests: Array<ProjectRequest>;
};
