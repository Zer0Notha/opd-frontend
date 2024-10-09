import { Card, Typography } from 'antd';
import { ProjectCardProps } from './interfaces';
import { useNavigate } from 'react-router-dom';
import { globals } from '@config/globals';
import Meta from 'antd/es/card/Meta';
import { FlexLayout } from '@components/flex';
import { UserDisplay } from '@components/user-display';
import { UserList } from '@components/user-list';

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
	const navigate = useNavigate();

	return (
		<Card
			hoverable
			style={{ width: 350 }}
			title={
				<FlexLayout width="100%" direction="row" padding="10px 0px" gap="16px">
					<FlexLayout
						border="3px solid orange"
						width="100px"
						padding="12px"
						borderRadius="16px">
						<img
							width={'100%'}
							alt="example"
							src={`${globals.apiUrl}/project/get-poster/${project.id}`}
						/>
					</FlexLayout>
					<FlexLayout direction="column">
						<Typography.Title level={3}>{project.name}</Typography.Title>
						<Typography.Paragraph>{project.description}</Typography.Paragraph>
						<UserList projectId={project.id} onlyAvatars />
					</FlexLayout>
				</FlexLayout>
			}
			onClick={() => navigate(`/project/${project.id}`)}>
			<Meta
				description={
					<FlexLayout>
						<UserDisplay id={project.managerId} />
					</FlexLayout>
				}
			/>
		</Card>
	);
};
