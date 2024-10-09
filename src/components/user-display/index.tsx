import { FlexLayout } from '@components/flex';
import { useGetUserQuery } from '@store/api';
import { Skeleton, Typography } from 'antd';

export const UserDisplay: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading } = useGetUserQuery(id);

	if (isLoading)
		return (
			<FlexLayout width="fit-content" padding="12px">
				<Skeleton />
			</FlexLayout>
		);

	return (
		<FlexLayout width="fit-content" padding="12px 6px" height="fit-content">
			<Typography.Text style={{ height: 'fit-content' }}>
				{data?.firstName} {data?.secondName}
			</Typography.Text>
		</FlexLayout>
	);
};
