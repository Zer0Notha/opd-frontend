import { ProjectListResponse, ProjectService } from '@services/project';
import { apiSlice } from '../api';
import { apiSlicePromiseWrapper } from '@utils/promise-wrapper';

export const projectApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getProjectList: build.query<ProjectListResponse, void>({
			queryFn: () => apiSlicePromiseWrapper(() => ProjectService.getList()),
			providesTags: ['ProjectList'],
		}),
	}),
});

export const { useGetProjectListQuery } = projectApi;
