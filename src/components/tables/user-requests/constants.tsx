import { RouterName } from '@router/interfaces';
import { ProjectRequest, ProjectRequestStatus } from '@services/request';
import { TableProps, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const tableProps = (): TableProps<ProjectRequest>['columns'] => [
	{
		title: 'Проект',
		dataIndex: 'project',
		render: (_, record: ProjectRequest) => (
			<>
				<Link to={RouterName.project.replace(':id', record.projectId)}>
					<Typography.Text>{record.project.name}</Typography.Text>
				</Link>
			</>
		),
	},
	{
		title: 'Приоритет',
		dataIndex: 'priority',
	},
	{
		title: 'Статус',
		dataIndex: 'status',
		render: (status) => (
			<Tag>
				{ProjectRequestStatus[status as keyof typeof ProjectRequestStatus]}
			</Tag>
		),
	},
];
