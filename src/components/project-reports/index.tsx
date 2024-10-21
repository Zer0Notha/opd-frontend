import { CreateReportForm } from '@components/create-report-form';
import { FlexLayout } from '@components/flex';
import { ReportFile } from '@components/report-file';
import { UserDisplay } from '@components/user-display';
import { useUser } from '@hooks/use-user';
import {
	CreateProjectReport,
	ProjectReport,
	ProjectService,
} from '@services/project';
import { apiSlice, useGetProjectUsersQuery } from '@store/api';
import {
	Button,
	Collapse,
	CollapseProps,
	Modal,
	Skeleton,
	Typography,
} from 'antd';
import { useCallback, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ProjectReports: React.FC<{
	reports: Array<ProjectReport>;
}> = ({ reports }) => {
	const [isOpen, setIsOpen] = useState(false);

	const { id } = useParams();
	const user = useUser();
	const dispatch = useDispatch();

	const { data, isLoading } = useGetProjectUsersQuery(id ?? '');

	const isTeamMember = useMemo(
		() => data?.users.includes(user?.id ?? ''),
		[user, data]
	);

	const collapseData: CollapseProps['items'] = useMemo(
		() =>
			reports.map((item) => ({
				key: item.id,
				label: `Отчёт от ${new Date(item.date).toLocaleDateString('ru-RU')}`,
				children: (
					<FlexLayout width="100%" direction="column">
						<FlexLayout direction="row" align="center">
							<Typography.Text>Автор:</Typography.Text>{' '}
							<UserDisplay id={item.authorId} />
						</FlexLayout>
						<Typography.Paragraph>{item.text}</Typography.Paragraph>
						<ReportFile id={item.id} />
					</FlexLayout>
				),
			})),
		[reports]
	);

	const handleCreateReport = useCallback(
		async (values: CreateProjectReport) => {
			try {
				await ProjectService.createProjectReport({
					...values,
					projectId: id ?? '',
				});
				dispatch(apiSlice.util.invalidateTags(['Project']));
			} catch {
				toast.error('При создании отчета произошла ошибка');
			}
		},
		[id, dispatch]
	);

	if (isLoading)
		return (
			<FlexLayout width="100%" direction="column">
				<Skeleton />
				<Skeleton />
				<Skeleton />
				<Skeleton />
			</FlexLayout>
		);

	return (
		<FlexLayout width="100%" direction="column">
			<Modal
				title="Создать отчет"
				open={isOpen}
				onClose={() => setIsOpen(false)}
				onCancel={() => setIsOpen(false)}
				footer={<></>}>
				<CreateReportForm onSubmit={handleCreateReport} />
			</Modal>
			<FlexLayout width="100%" justify="space-between">
				<Typography.Title level={3}>Отчеты</Typography.Title>
				{isTeamMember && (
					<Button onClick={() => setIsOpen(true)}>Создать отчет</Button>
				)}
			</FlexLayout>
			<FlexLayout width="100%">
				<Collapse style={{ width: '100%', gap: '12px' }} items={collapseData} />
			</FlexLayout>
		</FlexLayout>
	);
};
