import React from 'react';
import {
	StyledLogoWrapper,
	StyledNavigationWrapper,
	StyledOptionsWrapper,
} from './styles';
import { NavigationProps } from './interfaces';
import { NavigationFooter, NavigationOption } from './components';

export const Navigation: React.FC<NavigationProps> = ({
	logo,
	options,
	onSelectOption,
	optionsPosition = 'center',
	footer,
}): React.ReactElement => {
	return (
		<StyledNavigationWrapper>
			<StyledLogoWrapper>{logo}</StyledLogoWrapper>
			<StyledOptionsWrapper optionsPosition={optionsPosition}>
				{options.map((option) => {
					return <NavigationOption {...option} onSelect={onSelectOption} />;
				})}
			</StyledOptionsWrapper>
			{Boolean(footer) && <NavigationFooter>{footer}</NavigationFooter>}
		</StyledNavigationWrapper>
	);
};
