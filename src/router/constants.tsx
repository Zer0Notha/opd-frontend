import { UserRole } from '@services/user';
import { AppRote, RouterName } from './interfaces';
import { AuthPage } from '@pages/auth';
import { Navigate } from 'react-router-dom';

export const AUTHORIZED_ROUTES: Array<AppRote> = [];

export const UNAUTHORIZED_ROUTES: Array<Omit<AppRote, 'role'>> = [
	{
		path: RouterName.auth,
		element: <AuthPage />,
	},
	{
		path: RouterName.any,
		element: <Navigate to={RouterName.auth} />,
	},
];

export function buildRoutes(isAuth: boolean, role?: keyof typeof UserRole) {
	if (!isAuth) return UNAUTHORIZED_ROUTES;
	else {
		const routes = AUTHORIZED_ROUTES.filter((route) =>
			route.role.find((routeRole) => routeRole === role)
		).map((route) => {
			if (route.children) {
				return {
					...route,
					children: route.children.filter((childRoute) =>
						childRoute.role?.find((routeRole) => routeRole === role)
					),
				};
			}

			return route;
		});

		return routes;
	}
}
