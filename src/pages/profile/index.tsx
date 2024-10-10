import { FlexLayout } from '@components/flex';
import { UserProfile } from '@components/user-profile';
import { withNavigation } from '@hocs/with-navigation';
import { useUser } from '@hooks/use-user';

export const ProfilePage = withNavigation(() => {
	const user = useUser();
	return (
		<FlexLayout width="100%" height="100%" padding="12px">
			<UserProfile id={user?.id ?? ''} isProfile />
		</FlexLayout>
	);
});
