import { NavigationOptionProps } from './components';

export type OptionProps = Omit<NavigationOptionProps, 'onSelect'>;

export interface NavigationProps {
	logo?: string | React.ReactElement | React.ReactNode;
	onSelectOption: (link: string) => void;
	options: Array<OptionProps>;
	footer?: React.ReactElement | React.ReactNode;
	optionsPosition?: string;
}
