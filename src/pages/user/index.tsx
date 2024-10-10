import { FlexLayout } from '@components/flex';
import { UserProfile } from '@components/user-profile';
import { withNavigation } from '@hocs/with-navigation';
import { useParams } from 'react-router-dom';

export const UserPage = withNavigation(() => {
	const { id } = useParams();
	return (
		<FlexLayout width="100%" height="100%" padding="12px">
			<UserProfile id={id ?? ''} isProfile={false} />
		</FlexLayout>
	);
});
