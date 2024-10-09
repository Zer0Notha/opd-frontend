import { FlexLayout } from '@components/flex';
import { GroupType } from '@services/group';
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
				{data?.secondName} {data?.firstName} {data?.patronymic}
			</Typography.Text>
		</FlexLayout>
	);
};

export const UserGroup: React.FC<{ id: string }> = ({ id }) => {
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
				{data?.group.name}-{GroupType[data?.group.type ?? 'bachelor']}
				{data?.group.enteringYear.slice(2, 4)}
			</Typography.Text>
		</FlexLayout>
	);
};
