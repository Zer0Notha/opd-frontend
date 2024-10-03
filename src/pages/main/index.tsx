import { PlusOutlined } from '@ant-design/icons';
import { FlexLayout } from '@components/flex';
import { globals } from '@config/globals';
import { withNavigation } from '@hocs/with-navigation';
import { useUser } from '@hooks/use-user';
import { RouterName } from '@router/interfaces';
import { useGetProjectListQuery } from '@store/api';
import { Button, Card, Typography } from 'antd';
import Meta from 'antd/es/card/Meta';
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
					<Card
						hoverable
						style={{ width: 240 }}
						title={item.name}
						cover={
							<img
								alt="example"
								src={`${globals.apiUrl}/project/get-poster/${item.id}`}
							/>
						}>
						<Meta description={item.description} />
					</Card>
				))}
			</FlexLayout>
		</FlexLayout>
	);
});
