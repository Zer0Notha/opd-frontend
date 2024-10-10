import { FlexLayout } from '@components/flex';
import { useGetProjectUsersQuery } from '@store/api';
import { Avatar, Skeleton } from 'antd';
import { UserListProps } from './interfaces';
import React from 'react';
import { UserDisplay } from '@components/user-display';
import { useNavigate } from 'react-router-dom';
import { RouterName } from '@router/interfaces';

export const UserList: React.FC<UserListProps> = React.memo(
	({ projectId, onlyAvatars = false }) => {
		const { data, isLoading } = useGetProjectUsersQuery(projectId);
		const navigate = useNavigate();

		if (isLoading)
			return (
				<FlexLayout width="100%">
					<Skeleton />
				</FlexLayout>
			);

		return (
			<FlexLayout width="100%" direction="row" wrap="wrap" gap="5px">
				{onlyAvatars && (
					<Avatar.Group max={{ count: 3 }}>
						{data?.users.map((item) => (
							<Avatar
								style={{ cursor: 'pointer' }}
								onClick={() => navigate(RouterName.user.replace(':id', item))}>
								<UserDisplay id={item} />
							</Avatar>
						))}
					</Avatar.Group>
				)}

				{!onlyAvatars && (
					<>
						{data?.users.map((item) => (
							<FlexLayout
								align="center"
								style={{ cursor: 'pointer' }}
								onClick={() => navigate(RouterName.user.replace(':id', item))}>
								<Avatar>
									<UserDisplay id={item} />
								</Avatar>
								<UserDisplay id={item} />
							</FlexLayout>
						))}
					</>
				)}
			</FlexLayout>
		);
	}
);
