import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { FlexLayout } from '@components/flex';
import { ProjectInfoWidget } from '@components/project-info-widget';
import { ProjectReports } from '@components/project-reports';
import { ProjectRequests } from '@components/project-requests';
import { UserDisplay } from '@components/user-display';
import { globals } from '@config/globals';
import { useUser } from '@hooks/use-user';
import { Project, ProjectService, ProjectStatus } from '@services/project';
import { ProjectRequest, RequestService } from '@services/request';
import { apiSlice } from '@store/api';
import { Button, Divider, Tabs, TabsProps, Tag, Typography } from 'antd';
import { useCallback, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ProjectInfo = () => {
	const user = useUser();
	const { id } = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { project, myRequests, isLoading, isMyRequestsLoading } =
		useOutletContext<{
			project?: Project;
			myRequests: Array<ProjectRequest>;
			isLoading: boolean;
			isMyRequestsLoading: boolean;
		}>();

	const showEditButton =
		user?.id === project?.managerId ||
		user?.role === 'admin' ||
		user?.role === 'teacher';

	const showRequestButton =
		user?.id !== project?.managerId &&
		!isMyRequestsLoading &&
		!myRequests.find((item) => item.projectId === id) &&
		project?.status === 'opened';

	const allowedRoles = ['admin'];

	const showApproveRejectButtons =
		allowedRoles.includes(user?.role ?? '') &&
		project?.status === 'not_confirmed';

	const handleCreateRequest = useCallback(async () => {
		try {
			await RequestService.createRequest(id ?? '');
			dispatch(apiSlice.util.invalidateTags(['UserRequests']));
		} catch {
			toast.error('Возникла ошибка при подаче заявки');
		}
	}, [id, dispatch]);

	const handleApproveProject = useCallback(async () => {
		try {
			await ProjectService.approveProject(id ?? '');
			dispatch(apiSlice.util.invalidateTags(['Project']));
		} catch {
			toast.error('Возникла ошибка при подаче заявки');
		}
	}, [id, dispatch]);

	const handleRejectProject = useCallback(async () => {
		try {
			await ProjectService.rejectProject(id ?? '');
			dispatch(apiSlice.util.invalidateTags(['Project']));
		} catch {
			toast.error('Возникла ошибка при подаче заявки');
		}
	}, [id, dispatch]);

	const tabs: TabsProps['items'] = useMemo(() => {
		const items = [
			{
				key: '1',
				label: 'Информация',
				children: <ProjectInfoWidget project={project} isLoading={isLoading} />,
			},
			{
				key: '3',
				label: 'Отчеты',
				children: <ProjectReports reports={project?.reports ?? []} />,
			},
		];

		if (user?.id === project?.managerId) {
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
	}, [project, isLoading, user, id]);

	return (
		<>
			<FlexLayout
				direction="row"
				gap="24px"
				justify="center"
				wrap="wrap"
				height="fit-content">
				<FlexLayout
					border="3px solid orange"
					width="25%"
					padding="12px"
					maxHeight="60%"
					justify="flex-start"
					align="flex-start"
					borderRadius="16px">
					<img
						width={'100%'}
						height={'100%'}
						alt="example"
						src={`${globals.apiUrl}/project/get-poster/${id}`}
					/>
				</FlexLayout>
				<FlexLayout width="100%" gap="12px" direction="column">
					<FlexLayout
						width="100%"
						align="center"
						gap="10px"
						justify="space-between"
						wrap="wrap">
						<FlexLayout width="fit-content" align="center" gap="10px">
							<Typography.Title
								style={{ margin: 0, width: 'fit-content' }}
								level={2}>
								{project?.name}{' '}
							</Typography.Title>
							<Tag>{ProjectStatus[project?.status ?? 'not_confirmed']}</Tag>
						</FlexLayout>
						<FlexLayout gap="12px">
							{showEditButton && (
								<Button onClick={() => navigate('edit')}>Редактировать</Button>
							)}
							{showRequestButton && (
								<>
									{
										<Button onClick={handleCreateRequest}>
											Присоединиться
										</Button>
									}
								</>
							)}
							{showApproveRejectButtons && (
								<>
									<Button onClick={() => handleApproveProject()}>
										Подтвердить <CheckOutlined />
									</Button>
									<Button onClick={() => handleRejectProject()}>
										Отклонить <CloseOutlined />
									</Button>
								</>
							)}
						</FlexLayout>
					</FlexLayout>
					<Typography.Text>{project?.description}</Typography.Text>
					<FlexLayout direction="row" align="center">
						<Typography.Text>Автор:</Typography.Text>{' '}
						<UserDisplay id={project?.managerId ?? ''} />
					</FlexLayout>
				</FlexLayout>
			</FlexLayout>
			<Divider />
			<Tabs defaultActiveKey="1" items={tabs} />
		</>
	);
};
