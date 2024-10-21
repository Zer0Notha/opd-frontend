/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React from 'react';
import { useEffect } from 'react';
import { User } from '@services/user';
import { useLazyGetInfoQuery } from '@store/api';

import { useUser } from '@hooks/use-user';

type WrappedComponentProps<T> = {
	isAuth: boolean;
	user?: User;
} & T;

export const withAuth = <T,>(
	WrappedComponent: React.ComponentType<WrappedComponentProps<T>>
) => {
	const WrappedComponentContainer = (props: T) => {
		const [fetch, info] = useLazyGetInfoQuery();

		const user = useUser();

		const { isUninitialized, error, isLoading } = info;

		useEffect(() => {
			if (!isLoading && !error && (!user || !isUninitialized)) fetch();
		}, [user, fetch, isUninitialized, error, isLoading]);

		return <WrappedComponent {...props} isAuth={!!user} user={user} />;
	};

	return WrappedComponentContainer;
};
