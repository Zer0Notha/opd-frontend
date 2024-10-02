import styled from '@emotion/styled';
import { FlexProps } from './interfaces';

export const StyledFlexWrapper = styled('div')<FlexProps>`
	width: ${(props) => props.width};
	height: ${(props) => props.height};
	align-items: ${(props) => props.align};
	justify-content: ${(props) => props.justify};
	display: flex;
	margin: ${(props) => props.margin};
	padding: ${(props) => props.padding};
	gap: ${(props) => props.gap};
	flex-wrap: ${(props) => props.wrap};
	flex-grow: ${(props) => props.grow};
	flex-direction: ${(props) => props.direction};
	border-left: ${(props) => props.borderLeft};
	border-right: ${(props) => props.borderRight};
	overflow: ${(props) => props.overflow};
	max-height: ${(props) => props.maxHeight};
	min-height: ${(props) => props.minHeight};
	background-color: ${(props) => props.backgroudColor};
	border: ${(props) => props.border};
	border-radius: ${(props) => props.borderRadius};
	cursor: ${(props) => props.cursor};
	flex: ${(props) => props.flex};
	color: ${(props) => props.color};
`;
