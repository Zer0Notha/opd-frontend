import { FlexLayout } from '@components/flex';
import { UserList } from '@components/user-list';
import { Project } from '@services/project';
import { Typography } from 'antd';

export const ProjectInfoWidget: React.FC<{
	project?: Project;
	isLoading: boolean;
}> = ({ project, isLoading }) => {
	return (
		<>
			<FlexLayout direction="column">
				<Typography.Title level={3}>Проблема</Typography.Title>
				<Typography.Paragraph>{project?.problem}</Typography.Paragraph>
			</FlexLayout>
			<FlexLayout direction="column">
				<Typography.Title level={3}>Предлагаемое решение</Typography.Title>
				<Typography.Paragraph>{project?.wayOfSolving}</Typography.Paragraph>
			</FlexLayout>
			<FlexLayout direction="column">
				<Typography.Title level={3}>
					Команда: {project?.team.length}/{project?.maxUserNum} человек
				</Typography.Title>
				{!isLoading && (
					<UserList projectId={project?.id ?? ''} onlyAvatars={false} />
				)}
			</FlexLayout>
		</>
	);
};
