export const ProjectType = {
	scientific: 'scientific',
	technical: 'technical',
	service: 'service',
};

export const ProjectStatus = {
	not_confirmed: 'not_confirmed',
	opened: 'opened',
	closed: 'closed',
	rejected: 'rejected',
};

export interface CreateProject {
	name: string;
	description: string;

	type: string;
	maxUserNum: number;
	problem: string;
	wayOfSolving: string;
	file: File;
}

export interface Project {
	id: string;
	name: string;
	description: string;
	poster: string;
	type: keyof typeof ProjectType;
	maxUserNum: number;
	problem: string;
	wayOfSolving: string;
	status: keyof typeof ProjectStatus;
	managerId: string;
}

export type ProjectListResponse = {
	projects: Array<Project>;
};
