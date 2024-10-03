import { FlexLayout } from '@components/flex';
import { withNavigation } from '@hocs/with-navigation';
import { useGetProjectListQuery } from '@store/api';

export const MainPage = withNavigation(() => {
	const { data } = useGetProjectListQuery();

	return (
		<FlexLayout width="100%" padding="12px">
			MainPage
		</FlexLayout>
	);
});
