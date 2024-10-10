import { PlusOutlined } from '@ant-design/icons';
import { FlexLayout } from '@components/flex';
import { ProjectCard } from '@components/project-card';
import { withNavigation } from '@hocs/with-navigation';
import { useUser } from '@hooks/use-user';
import { RouterName } from '@router/interfaces';
import { useGetProjectListQuery } from '@store/api';
import { Button, Dropdown, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { filterItems } from './constants';
import { useCallback, useState } from 'react';
import { ProjectStatus, ProjectType } from '@services/project';

export const MainPage = withNavigation(() => {
	const [status, setStatus] = useState<keyof typeof ProjectStatus | null>(null);
	const [type, setType] = useState<keyof typeof ProjectType | null>(null);
	const { data } = useGetProjectListQuery({ status, type });

	const user = useUser();
	const navigate = useNavigate();

	const handleFilterChange = useCallback((filters: Array<string>) => {
		if (filters[0] === 'all') {
			setStatus(null);
			setType(null);
		}

		if (Object.keys(ProjectStatus).includes(filters[0]))
			setStatus(filters[0] as keyof typeof ProjectStatus);

		if (Object.keys(ProjectType).includes(filters[0]))
			setType(filters[0] as keyof typeof ProjectType);
	}, []);

	return (
		<FlexLayout width="100%" padding="12px" direction="column" gap="36px">
			<FlexLayout width="100%" justify="space-between">
				<Typography.Title level={4}>Проекты</Typography.Title>
				<FlexLayout gap="8px">
					<Dropdown
						menu={{
							items: filterItems,
							selectable: true,
							defaultSelectedKeys: ['all'],
							onSelect: (props) => {
								handleFilterChange(props.selectedKeys);
							},
						}}>
						<Button onClick={(e) => e.preventDefault()}>Фильтры</Button>
					</Dropdown>
					{user?.role === 'teacher' && (
						<Button
							icon={<PlusOutlined />}
							onClick={() => navigate(RouterName.create_project)}>
							Создать проект
						</Button>
					)}
				</FlexLayout>
			</FlexLayout>
			<FlexLayout width="100%" wrap="wrap" gap="16px">
				{data?.projects.map((item) => (
					<ProjectCard project={item} />
				))}
			</FlexLayout>
		</FlexLayout>
	);
});
