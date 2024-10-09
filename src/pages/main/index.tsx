import { PlusOutlined } from '@ant-design/icons';
import { FlexLayout } from '@components/flex';
import { ProjectCard } from '@components/project-card';
import { withNavigation } from '@hocs/with-navigation';
import { useUser } from '@hooks/use-user';
import { RouterName } from '@router/interfaces';
import { useGetProjectListQuery } from '@store/api';
import { Button, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

export const MainPage = withNavigation(() => {
	const { data } = useGetProjectListQuery();

	const user = useUser();
	const navigate = useNavigate();

	return (
		<FlexLayout width="100%" padding="12px" direction="column" gap="36px">
			<FlexLayout width="100%" justify="space-between">
				<Typography.Title level={4}>Проекты</Typography.Title>
				{user?.role === 'teacher' && (
					<Button
						icon={<PlusOutlined />}
						onClick={() => navigate(RouterName.create_project)}>
						Создать проект
					</Button>
				)}
			</FlexLayout>
			<FlexLayout width="100%" wrap="wrap" gap="16px">
				{data?.projects.map((item) => (
					<ProjectCard project={item} />
				))}
			</FlexLayout>
		</FlexLayout>
	);
});
