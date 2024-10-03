import styled from '@emotion/styled';

export const StyledNavOption = styled('div')<{ selected?: boolean }>`
	height: fit-content;
	padding: 12px;
	display: flex;

	gap: 8px;

	background-color: transparent;

	cursor: pointer;

	border-bottom: 3px solid transparent;

	@media screen and (max-width: 576px) {
		width: fit-content;

		justify-content: center;
	}

	${(props) => {
		if (props.selected) {
			return `
				
				
				font-weight: 600;
            `;
		}
		return '';
	}}
`;
