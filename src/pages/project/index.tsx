import { FlexLayout } from '@components/flex';
import { ProjectInfo } from '@components/project-info';
import { ProjectRequests } from '@components/project-requests';
import { UserDisplay } from '@components/user-display';
import { globals } from '@config/globals';
import { withNavigation } from '@hocs/with-navigation';
import { useUser } from '@hooks/use-user';
import { RequestService } from '@services/request';
import { useGetProjectQuery } from '@store/api';
import { Button, Divider, Tabs, TabsProps, Typography } from 'antd';
import { useCallback, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ProjectPage = withNavigation(() => {
	const { id } = useParams();
	const user = useUser();

	const { data, isLoading } = useGetProjectQuery(id ?? '');

	const handleCreateRequest = useCallback(async () => {
		try {
			await RequestService.createRequest(id ?? '');
		} catch {
			toast.error('Возникла ошибка при подаче заявки');
		}
	}, [id]);

	const tabs: TabsProps['items'] = useMemo(() => {
		const items = [
			{
				key: '1',
				label: 'Информация',
				children: <ProjectInfo project={data} isLoading={isLoading} />,
			},
		];

		if (user?.id === data?.managerId) {
			items.push({
				key: '2',
				label: 'Заявки',
				children: (
					<>
						<ProjectRequests projectId={id ?? ''} />
					</>
				),
			});
		}

		return items;
	}, [data, isLoading, user, id]);

	return (
		<FlexLayout
			width="100%"
			height="100%"
			direction="column"
			padding="12px"
			gap="12px">
			<FlexLayout
				width="100%"
				direction="row"
				gap="24px"
				justify="center"
				height="fit-content">
				<FlexLayout
					border="3px solid orange"
					width="300px"
					padding="12px"
					height="fit-content"
					justify="flex-start"
					align="flex-start"
					borderRadius="16px">
					<img
						width={'100%'}
						alt="example"
						src={`${globals.apiUrl}/project/get-poster/${id}`}
					/>
				</FlexLayout>
				<FlexLayout width="100%" gap="12px" direction="column">
					<Typography.Title>{data?.name}</Typography.Title>
					<Typography.Text>{data?.description}</Typography.Text>
					<FlexLayout direction="row" align="center">
						<Typography.Text>Автор:</Typography.Text>{' '}
						<UserDisplay id={data?.managerId ?? ''} />
					</FlexLayout>
				</FlexLayout>
				<FlexLayout>
					{user?.id === data?.managerId && <Button>Управление</Button>}
					{user?.id !== data?.managerId && (
						<Button onClick={handleCreateRequest}>Присоединиться</Button>
					)}
				</FlexLayout>
			</FlexLayout>
			<Divider />
			<Tabs defaultActiveKey="1" items={tabs} />
		</FlexLayout>
	);
});
