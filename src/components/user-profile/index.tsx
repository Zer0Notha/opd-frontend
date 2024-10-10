import { FlexLayout } from '@components/flex';
import { UserProjects } from '@components/tables/user-projects';
import { UserRequests } from '@components/tables/user-requests';
import { UserGroup } from '@components/user-display';
import { UserRole } from '@services/user';
import {
	useGetUserProjectsQuery,
	useGetUserQuery,
	useGetUserRequestsQuery,
} from '@store/api';
import { Avatar, Divider, Tabs, TabsProps, Tag, Typography } from 'antd';
import { useMemo } from 'react';

export const UserProfile: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading } = useGetUserQuery(id);
	const { data: projects, isLoading: isProjectsLoading } =
		useGetUserProjectsQuery(id);

	const { data: requests, isLoading: isRequestsLoading } =
		useGetUserRequestsQuery(id);

	const tabs: TabsProps['items'] = useMemo(() => {
		const items = [
			{
				key: '1',
				label: 'Проекты',
				children: (
					<UserProjects
						projects={projects?.projects ?? []}
						isLoading={isProjectsLoading}
					/>
				),
			},
			{
				key: '2',
				label: 'Заявки',
				children: (
					<UserRequests
						requests={requests?.requests ?? []}
						isLoading={isRequestsLoading}
					/>
				),
			},
		];

		return items;
	}, [requests, isRequestsLoading, isProjectsLoading, projects]);

	if (isLoading) return <>Loading...</>;

	return (
		<FlexLayout width="100%" direction="column">
			<FlexLayout width="100%" align="center" justify="center" gap="12px">
				<FlexLayout>
					<Avatar size={128}>
						{data?.secondName} {data?.firstName}
					</Avatar>
				</FlexLayout>
				<FlexLayout direction="column">
					<FlexLayout align="flex-end" gap="12px">
						<Typography.Title style={{ margin: 0 }}>
							{data?.secondName} {data?.firstName} {data?.patronymic}
						</Typography.Title>
						<Tag style={{ marginBottom: '8px' }}>
							{UserRole[data?.role ?? 'student']}
						</Tag>
					</FlexLayout>
					<Typography.Text>
						<UserGroup id={id} />
					</Typography.Text>
					<Typography.Text>
						<a href={data?.vk} target="_blank">
							vk
						</a>
					</Typography.Text>
				</FlexLayout>
			</FlexLayout>
			<Divider />
			<FlexLayout width="100%" height="100%">
				<Tabs style={{ width: '100%' }} items={tabs} />
			</FlexLayout>
		</FlexLayout>
	);
};
