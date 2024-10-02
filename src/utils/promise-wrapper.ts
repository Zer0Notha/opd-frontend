import type {
	BaseQueryFn,
	QueryReturnValue,
} from '@reduxjs/toolkit/src/query/baseQueryTypes';
import type { MaybePromise } from '@reduxjs/toolkit/src/query/tsHelpers';
import { AxiosError } from 'axios';

export const apiSlicePromiseWrapper = async <F extends () => Promise<O>, O>(
	fn: F
): Promise<QueryReturnValue<O>> => {
	try {
		const data = await fn();
		return {
			data,
		};
	} catch (e) {
		const error = e as AxiosError;

		const errorMassage = `${error?.message}`;

		const errorInfo = error?.response?.data;

		console.info(errorMassage);

		if (errorInfo) {
			console.info(`Подробности ошибки: `, errorInfo);
		}

		return {
			error: errorMassage,
		};
	}
};

export function fakeBaseQuery<ErrorType>(): BaseQueryFn<
	void,
	never,
	ErrorType
> {
	return (): MaybePromise<
		QueryReturnValue<never, ErrorType, Record<string, string>>
	> => {
		throw new Error(
			'All queries & mutations must use the `queryFn` definition syntax'
		);
	};
}
