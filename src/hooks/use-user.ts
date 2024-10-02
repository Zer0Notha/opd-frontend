import { useSelector } from 'react-redux';
import { User } from '@services/user';
import { userResultSelector } from '@store/selectors';

/**
 * @description returns MyInfo | undefined from store
 *
 */

export const useUser = (): User | undefined => {
	const user = useSelector(userResultSelector);

	return user.data;
};
