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
		getMyRequests: build.query<ProjectRequestsResponse, string>({
			queryFn: (args: string) =>
				apiSlicePromiseWrapper(() => RequestService.getMyRequests(args)),
			providesTags: ['MyRequests'],
		}),
	}),
});

export const { useGetProjectRequestsQuery, useGetMyRequestsQuery } = requestApi;
