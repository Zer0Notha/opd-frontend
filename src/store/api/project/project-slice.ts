import {
	Project,
	ProjectListProps,
	ProjectListResponse,
	ProjectService,
	ProjectUsersResponse,
} from '@services/project';
import { apiSlice } from '../api';
import { apiSlicePromiseWrapper } from '@utils/promise-wrapper';

export const projectApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getProjectList: build.query<ProjectListResponse, ProjectListProps>({
			queryFn: (args: ProjectListProps) =>
				apiSlicePromiseWrapper(() => ProjectService.getList(args)),
			providesTags: ['ProjectList'],
		}),
		getProject: build.query<Project, string>({
			queryFn: (args: string) =>
				apiSlicePromiseWrapper(() => ProjectService.getProject(args)),
			providesTags: ['Project'],
		}),
		getUserProjects: build.query<ProjectListResponse, string>({
			queryFn: (args: string) =>
				apiSlicePromiseWrapper(() => ProjectService.getUserProjects(args)),
			providesTags: ['UserProjects'],
		}),
		getProjectUsers: build.query<ProjectUsersResponse, string>({
			queryFn: (args: string) =>
				apiSlicePromiseWrapper(() => ProjectService.getProjectUsers(args)),
			providesTags: ['ProjectUsers'],
		}),
	}),
});

export const {
	useGetProjectListQuery,
	useGetProjectQuery,
	useGetProjectUsersQuery,
	useGetUserProjectsQuery,
} = projectApi;
