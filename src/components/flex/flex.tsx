import React from 'react';
import { FlexProps } from './interfaces';
import { StyledFlexWrapper } from './styles';

export const FlexLayout: React.FC<FlexProps> = ({
	children,
	...props
}): React.ReactElement => {
	return <StyledFlexWrapper {...props}>{children}</StyledFlexWrapper>;
};
