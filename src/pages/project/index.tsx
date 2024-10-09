import { FlexLayout } from '@components/flex';
import { ProjectInfo } from '@components/project-info';
import { ProjectRequests } from '@components/project-requests';
import { UserDisplay } from '@components/user-display';
import { globals } from '@config/globals';
import { withNavigation } from '@hocs/with-navigation';
import { useUser } from '@hooks/use-user';
import { RouterName } from '@router/interfaces';
import { ProjectStatus } from '@services/project';
import { RequestService } from '@services/request';
import {
	apiSlice,
	useGetMyRequestsQuery,
	useGetProjectQuery,
} from '@store/api';
import {
	Breadcrumb,
	Button,
	Divider,
	Tabs,
	TabsProps,
	Tag,
	Typography,
} from 'antd';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ProjectPage = withNavigation(() => {
	const { id } = useParams();
	const user = useUser();
	const dispatch = useDispatch();

	const { data, isLoading } = useGetProjectQuery(id ?? '');

	const { data: myRequestsData, isLoading: isMyRequestsLoading } =
		useGetMyRequestsQuery(user?.id ?? '');

	const handleCreateRequest = useCallback(async () => {
		try {
			await RequestService.createRequest(id ?? '');
			dispatch(apiSlice.util.invalidateTags(['MyRequests']));
		} catch {
			toast.error('Возникла ошибка при подаче заявки');
		}
	}, [id, dispatch]);

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
			padding="16px"
			gap="12px">
			<Breadcrumb
				items={[
					{ title: <Link to={RouterName.main}>Главная</Link> },
					{ title: <Link to={`/project/${id}`}>{data?.name}</Link> },
				]}
			/>
			<FlexLayout
				direction="row"
				gap="24px"
				justify="center"
				wrap="wrap"
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
					<FlexLayout align="center" gap="10px" justify="space-between">
						<FlexLayout align="center" gap="10px">
							<Typography.Title style={{ margin: 0 }} level={2}>
								{data?.name}{' '}
							</Typography.Title>
							<Tag>{ProjectStatus[data?.status ?? 'not_confirmed']}</Tag>
						</FlexLayout>
						<FlexLayout>
							{user?.id === data?.managerId && <Button>Редактировать</Button>}
							{user?.id !== data?.managerId && (
								<>
									{!isMyRequestsLoading &&
										!myRequestsData?.requests.find(
											(item) => item.projectId === id
										) &&
										data?.status !== 'opened' && (
											<Button onClick={handleCreateRequest}>
												Присоединиться
											</Button>
										)}
								</>
							)}
						</FlexLayout>
					</FlexLayout>
					<Typography.Text>{data?.description}</Typography.Text>
					<FlexLayout direction="row" align="center">
						<Typography.Text>Автор:</Typography.Text>{' '}
						<UserDisplay id={data?.managerId ?? ''} />
					</FlexLayout>
				</FlexLayout>
			</FlexLayout>
			<Divider />
			<Tabs defaultActiveKey="1" items={tabs} />
		</FlexLayout>
	);
});
