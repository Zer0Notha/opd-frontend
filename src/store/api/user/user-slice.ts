import { apiSlicePromiseWrapper } from '@utils/promise-wrapper';

import { User, UserService } from '@services/user';
import { apiSlice } from '../api';

export const userApi = apiSlice.injectEndpoints({
	endpoints: (build) => ({
		getInfo: build.query<User, void>({
			queryFn: () => apiSlicePromiseWrapper(() => UserService.getMyInfo()),
			providesTags: ['MyInfo'],
		}),
		getUser: build.query<User, string>({
			queryFn: (args: string) =>
				apiSlicePromiseWrapper(() => UserService.getUserById(args)),
		}),
	}),
});

export const { useLazyGetInfoQuery, useGetUserQuery } = userApi;
