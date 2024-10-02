import { createApi } from '@reduxjs/toolkit/query/react';

import { fakeBaseQuery } from '@utils/promise-wrapper';

export const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fakeBaseQuery(),
	tagTypes: [],
	endpoints: () => ({}),
});
