import { apiSlicePromiseWrapper } from '@utils/promise-wrapper';
import { apiSlice } from '../api';
import { ProjectRequestsResponse, RequestService } from '@services/request';

export const requestApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getProjectRequests: build.query<ProjectRequestsResponse, string>({
			queryFn: (args: string) =>
				apiSlicePromiseWrapper(() => RequestService.getProjectRequests(args)),
			providesTags: ['ProjectRequests'],
		}),
		getUserRequests: build.query<ProjectRequestsResponse, string>({
			queryFn: (args: string) =>
				apiSlicePromiseWrapper(() => RequestService.getUserRequests(args)),
			providesTags: ['UserRequests'],
		}),
	}),
});

export const { useGetProjectRequestsQuery, useGetUserRequestsQuery } =
	requestApi;
