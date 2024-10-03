import { RouterKeys } from '@router/interfaces';
import { NavigationOptionProps } from '../navigation';

export type NavOption = Pick<
	NavigationOptionProps,
	'icon' | 'link' | 'text'
> & {
	name: RouterKeys;
};
