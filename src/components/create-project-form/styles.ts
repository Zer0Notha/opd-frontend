import styled from '@emotion/styled';

export const ProjectFormInputWrapper = styled('div')`
	width: 100%;

	display: flex;
	text-align: center;
	flex-direction: column;
`;

export const StyledDropzone = styled('div')`
	width: 100%;

	padding: 32px;

	border-radius: 16px;

	border: 2px dotted black;

	cursor: pointer;

	gap: 12px;

	display: flex;
	flex-direction: column;

	align-items: center;

	:hover {
		border: 2px dotted blue;
		color: blue;
		transition: 0.2s;
	}
`;

export const StyledFile = styled('div')`
	width: 100%;
	padding: 16px;

	display: flex;

	flex-direction: row;

	background-color: white;

	border: 1px solid lightgray;

	border-radius: 16px;

	justify-content: space-between;
`;

export const StyledFileContent = styled('div')`
	display: flex;
	flex-direction: column;
	gap: 8px;
`;

export const StyledFileList = styled('div')`
	display: flex;
	flex-direction: column;
	flex-grow: 1;
	gap: 8px;
	overflow: auto;
`;
