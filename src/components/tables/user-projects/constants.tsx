import { UserDisplay } from '@components/user-display';
import { RouterName } from '@router/interfaces';
import { Project, ProjectStatus } from '@services/project';
import { TableProps, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';

export const tableProps = (): TableProps<Project>['columns'] => [
	{
		title: 'Проект',
		dataIndex: 'project',
		render: (_, record: Project) => (
			<>
				<Link to={RouterName.project.replace(':id', record.id)}>
					<Typography.Text>{record.name}</Typography.Text>
				</Link>
			</>
		),
	},
	{
		title: 'Менеджер',
		dataIndex: 'managerId',
		render: (_, record: Project) => (
			<>
				<Link to={RouterName.user.replace(':id', record.managerId)}>
					<UserDisplay id={record.managerId} />
				</Link>
			</>
		),
	},
	{
		title: 'Статус',
		dataIndex: 'status',
		render: (_, record: Project) => (
			<Tag>{ProjectStatus[record.status as keyof typeof ProjectStatus]}</Tag>
		),
	},
];
