import {
	Project,
	ProjectListResponse,
	ProjectService,
	ProjectUsersResponse,
} from '@services/project';
import { apiSlice } from '../api';
import { apiSlicePromiseWrapper } from '@utils/promise-wrapper';

export const projectApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getProjectList: build.query<ProjectListResponse, void>({
			queryFn: () => apiSlicePromiseWrapper(() => ProjectService.getList()),
			providesTags: ['ProjectList'],
		}),
		getProject: build.query<Project, string>({
			queryFn: (args: string) =>
				apiSlicePromiseWrapper(() => ProjectService.getProject(args)),
			providesTags: ['Project'],
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
} = projectApi;
