import { UserRole } from '@services/user';
import { AppRote, RouterName } from './interfaces';
import { AuthPage } from '@pages/auth';
import { Navigate } from 'react-router-dom';
import { RegisterPage } from '@pages/register';
import { MainPage } from '@pages/main';
import { CreateProjectPage } from '@pages/create-project';
import { ProjectPage } from '@pages/project';

export const AUTHORIZED_ROUTES: Array<AppRote> = [
	{
		path: RouterName.main,
		element: <MainPage />,
		role: ['admin', 'mentor', 'student', 'teacher'],
	},
	{
		path: RouterName.create_project,
		element: <CreateProjectPage />,
		role: ['mentor', 'teacher'],
	},
	{
		path: RouterName.project,
		element: <ProjectPage />,
		role: ['admin', 'mentor', 'student', 'teacher'],
	},
	{
		path: RouterName.any,
		element: <Navigate to={RouterName.main} />,
		role: ['admin', 'mentor', 'student', 'teacher'],
	},
];

export const UNAUTHORIZED_ROUTES: Array<Omit<AppRote, 'role'>> = [
	{
		path: RouterName.auth,
		element: <AuthPage />,
	},
	{
		path: RouterName.register,
		element: <RegisterPage />,
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
