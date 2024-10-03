export interface NavigationOptionProps {
	icon?: React.ReactElement | React.ReactNode;
	text?: string | React.ReactElement | React.ReactNode;
	link: string;
	selected?: boolean;
	onSelect: (link: string) => void;
}
