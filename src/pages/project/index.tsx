import { FlexLayout } from '@components/flex';
import { withNavigation } from '@hocs/with-navigation';
import { useUser } from '@hooks/use-user';
import { RouterName } from '@router/interfaces';
import { useGetMyRequestsQuery, useGetProjectQuery } from '@store/api';
import { Breadcrumb } from 'antd';

import { Link, Outlet } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export const ProjectPage = withNavigation(() => {
	const { id } = useParams();
	const user = useUser();

	const { data, isLoading } = useGetProjectQuery(id ?? '');

	const { data: myRequestsData, isLoading: isMyRequestsLoading } =
		useGetMyRequestsQuery(user?.id ?? '');

	return (
		<FlexLayout
			width="100%"
			height="100%"
			direction="column"
			padding="16px"
			gap="12px">
			<Breadcrumb
				items={[
					{ title: <Link to={RouterName.main}>Главная</Link> },
					{ title: <Link to={`/project/${id}`}>{data?.name}</Link> },
				]}
			/>
			<Outlet
				context={{
					project: data,
					myRequests: myRequestsData?.requests,
					isLoading,
					isMyRequestsLoading,
				}}
			/>
		</FlexLayout>
	);
});
