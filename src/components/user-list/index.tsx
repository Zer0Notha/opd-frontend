import { FlexLayout } from '@components/flex';
import { useGetProjectUsersQuery } from '@store/api';
import { Avatar, Skeleton } from 'antd';
import { UserListProps } from './interfaces';
import React from 'react';
import { UserDisplay } from '@components/user-display';

export const UserList: React.FC<UserListProps> = React.memo(
	({ projectId, onlyAvatars = false }) => {
		const { data, isLoading } = useGetProjectUsersQuery(projectId);

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
							<Avatar>
								<UserDisplay id={item} />
							</Avatar>
						))}
					</Avatar.Group>
				)}

				{!onlyAvatars && (
					<>
						{data?.users.map((item) => (
							<FlexLayout align="center">
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
