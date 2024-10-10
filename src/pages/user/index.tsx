import { FlexLayout } from '@components/flex';
import { UserProfile } from '@components/user-profile';
import { withNavigation } from '@hocs/with-navigation';
import { useUser } from '@hooks/use-user';
import { RouterName } from '@router/interfaces';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export const UserPage = withNavigation(() => {
	const { id } = useParams();
	const user = useUser();
	const navigate = useNavigate();

	useEffect(() => {
		if (id === user?.id) navigate(RouterName.profile);
	}, [id, navigate, user?.id]);

	return (
		<FlexLayout width="100%" height="100%" padding="12px">
			<UserProfile id={id ?? ''} isProfile={false} />
		</FlexLayout>
	);
});
