import React from 'react';
import { Navbar } from '@components/navbar';
import { ComponentType } from 'react';
import { RouterKeys } from '../router';
import { Layout } from 'antd';

type WithNavigation<T> = {
	hideMenuOptions?: boolean;
	active?: RouterKeys;
} & T;

export const withNavigation = <T,>(
	Component: ComponentType<WithNavigation<T>>
) => {
	return (props: WithNavigation<T>): React.ReactElement => {
		return (
			<Layout style={{ minHeight: '100vh' }}>
				<Navbar
					hideOptions={Boolean(props.hideMenuOptions)}
					active={props.active}
				/>

				<Layout.Content>
					<Component {...props} />
				</Layout.Content>
			</Layout>
		);
	};
};
