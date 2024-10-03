import React from 'react';
import { NavigationFooterWrapper } from './styles';

export const NavigationFooter: React.FC<{
	children?: React.ReactElement | React.ReactNode;
}> = ({ children }): React.ReactElement => {
	return <NavigationFooterWrapper>{children}</NavigationFooterWrapper>;
};
