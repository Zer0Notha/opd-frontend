import styled from '@emotion/styled';

export const StyledNavigationWrapper = styled('div')`
	width: 100%;

	height: fit-content;

	display: flex;
	flex-direction: row;

	align-items: center;

	position: sticky;
	top: 0;

	-webkit-box-shadow: 0px 10px 13px -1px rgba(34, 60, 80, 0.2);
	-moz-box-shadow: 0px 10px 13px -1px rgba(34, 60, 80, 0.2);
	box-shadow: 0px 10px 13px -1px rgba(34, 60, 80, 0.2);
	//margin: 10px 10px;

	padding: 12px 12px;

	//border-radius: 12px;

	align-self: center;

	border-radius: 12px;

	z-index: 1000;

	gap: 24px;
	//margin: 10px;

	background-color: white;
`;

export const StyledLogoWrapper = styled('div')`
	height: fit-content;

	cursor: pointer;

	@media screen and (max-width: 576px) {
		width: fit-content;
	}
`;

export const StyledOptionsWrapper = styled('div')<{ optionsPosition: string }>`
	height: fit-content;
	flex-grow: 1;

	display: flex;

	flex-direction: row;

	justify-content: ${(props) => props.optionsPosition};

	gap: 5px;
`;
