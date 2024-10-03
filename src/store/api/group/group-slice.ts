import { GroupResponse, GroupService } from '@services/group';
import { apiSlice } from '../api';
import { apiSlicePromiseWrapper } from '@utils/promise-wrapper';

export const groupApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getGroupList: build.query<GroupResponse, void>({
			queryFn: () => apiSlicePromiseWrapper(() => GroupService.getGroups()),
			providesTags: ['GroupList'],
		}),
	}),
});

export const { useGetGroupListQuery } = groupApi;
