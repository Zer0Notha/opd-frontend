import { withAuth } from '@hocs/with-auth';
import { ReactNode } from 'react';
import { useRoutes } from 'react-router-dom';
import { buildRoutes } from './constants';

export const Router = withAuth(({ isAuth, user }) => {
	const routes: { path: string; element?: ReactNode }[] = buildRoutes(
		isAuth,
		user?.role
	);

	const element = useRoutes([...routes]);

	return element;
});
