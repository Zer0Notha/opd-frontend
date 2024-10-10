import { createApi } from '@reduxjs/toolkit/query/react';

import { fakeBaseQuery } from '@utils/promise-wrapper';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fakeBaseQuery(),
	tagTypes: [
		'MyInfo',
		'GroupList',
		'ProjectList',
		'Project',
		'ProjectUsers',
		'ProjectRequests',
		'UserRequests',
		'UserProjects',
	],
	endpoints: () => ({}),
});
