import { Button, Card, Tag, Typography } from 'antd';
import { ProjectCardProps } from './interfaces';
import { useNavigate } from 'react-router-dom';
import { globals } from '@config/globals';
import Meta from 'antd/es/card/Meta';
import { FlexLayout } from '@components/flex';
import { UserDisplay } from '@components/user-display';
import { UserList } from '@components/user-list';
import { ProjectStatus } from '@services/project';

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const navigate = useNavigate();

	return (
		<Card
			hoverable
			style={{ width: 400 }}
			title={
				<FlexLayout
					width="100%"
					direction="row"
					padding="10px 0px"
					gap="16px"
					align="center">
					<FlexLayout
						border="3px solid orange"
						width="fit-content"
						height="fit-content"
						padding="12px"
						align="center"
						borderRadius="16px">
						<img
							width={'80px'}
							height={'80px'}
							alt="example"
							src={`${globals.apiUrl}/project/get-poster/${project.id}`}
						/>
					</FlexLayout>
					<FlexLayout direction="column" gap={'8px'}>
						<FlexLayout width="100%" align="center" gap="8px">
							<Typography.Title style={{ margin: 0 }} level={3}>
								{project.name}
							</Typography.Title>{' '}
							<FlexLayout height="fit-content">
								<Tag>{ProjectStatus[project.status]}</Tag>
							</FlexLayout>
						</FlexLayout>
						<Typography.Paragraph>{project.description}</Typography.Paragraph>
						<UserList projectId={project.id} onlyAvatars />
					</FlexLayout>
				</FlexLayout>
			}>
			<Meta
				description={
					<FlexLayout width="100%" justify="space-between" align="center">
						<UserDisplay id={project.managerId} />
						<Button onClick={() => navigate(`/project/${project.id}`)}>
							Подробнее
						</Button>
					</FlexLayout>
				}
			/>
		</Card>
	);
};
