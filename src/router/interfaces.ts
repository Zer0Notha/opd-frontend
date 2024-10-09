import { UserRole } from '@services/user';
import { ReactNode } from 'react';

export enum RouterName {
	main = '/',
	auth = '/auth',
	register = '/register',
	profile = '/profile',
	user = '/user/:id',
	create_project = '/create-project',
	project = '/project/:id',
	any = '*',
}

export type RouterKeys = keyof typeof RouterName;

export interface AppRote {
	path: string;
	element?: ReactNode;
	role: Array<keyof typeof UserRole>;
	index?: boolean;
	children?: Array<AppRote>;
}
