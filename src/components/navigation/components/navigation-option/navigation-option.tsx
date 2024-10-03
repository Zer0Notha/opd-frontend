import React from 'react';
import { useMedia } from 'use-media';
import { NavigationOptionProps } from './interfaces';
import { StyledNavOption } from './styles';
import { Typography } from 'antd';

export const NavigationOption: React.FC<NavigationOptionProps> = React.memo(
	({ icon, text, link, selected = false, onSelect }): React.ReactElement => {
		const isMobile = useMedia({ maxWidth: '576px' });

		return (
			<StyledNavOption selected={selected} onClick={() => onSelect(link)}>
				{icon}
				{!isMobile && <Typography color="inherit">{text}</Typography>}
			</StyledNavOption>
		);
	}
);
