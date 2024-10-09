export interface FlexProps extends React.ComponentProps<'div'> {
	width?: string;
	height?: string;
	direction?: string;
	align?: string;
	justify?: string;
	margin?: string;
	padding?: string;
	gap?: string;
	wrap?: string;
	grow?: string;
	borderLeft?: string;
	borderRight?: string;
	children?: React.ReactElement | React.ReactNode;
	overflow?: string;
	maxHeight?: string;
	minHeight?: string;
	background?: string;
	backgroudColor?: string;
	border?: string;
	borderRadius?: string;
	cursor?: string;
	flex?: string;
	color?: string;
}
