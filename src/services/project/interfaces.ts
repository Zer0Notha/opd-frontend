export const ProjectType = {
	scientific: 'Научный',
	technical: 'Технический',
	service: 'Сервисный',
};

export const ProjectStatus = {
	not_confirmed: 'На рассмотрении',
	opened: 'Набор открыт',
	closed: 'Набор закрыт',
	rejected: 'Отклонен',
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

export type UpdateProject = Omit<CreateProject, 'file' | 'maxUserNum'> & {
	id: string;
};

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

export type ProjectListProps = {
	status: keyof typeof ProjectStatus | null;
	type: keyof typeof ProjectType | null;
};

export type ProjectListResponse = {
	projects: Array<Project>;
};

export type ProjectUsersResponse = {
	users: Array<string>;
};
