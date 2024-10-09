import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { FlexLayout } from '@components/flex';
import { UserDisplay, UserGroup } from '@components/user-display';
import { RouterName } from '@router/interfaces';
import { ProjectRequest, ProjectRequestStatus } from '@services/request';
import { Button, TableProps, Tag } from 'antd';
import { Link } from 'react-router-dom';

export const tableProps = (
	onApprove: (id: string) => void,
	onReject: (id: string) => void
): TableProps<ProjectRequest>['columns'] => [
	{
		title: 'ФИО',
		dataIndex: 'userId',
		render: (userId) => (
			<>
				<Link to={RouterName.user.replace(':id', userId)}>
					<UserDisplay id={userId} />
				</Link>
			</>
		),
	},
	{
		title: 'Приоритет',
		dataIndex: 'priority',
	},
	{
		title: 'Группа',
		dataIndex: 'userId',
		render: (userId) => (
			<>
				<UserGroup id={userId} />
			</>
		),
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
	{
		title: 'Действия',
		dataIndex: 'id',
		render: (id: string, record: ProjectRequest) => (
			<FlexLayout gap="12px">
				{record.status === 'working' && (
					<>
						<Button onClick={() => onApprove(id)}>
							<CheckOutlined />
						</Button>
						<Button onClick={() => onReject(id)}>
							<CloseOutlined />
						</Button>
					</>
				)}
			</FlexLayout>
		),
	},
];
