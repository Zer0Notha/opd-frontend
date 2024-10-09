export interface Group {
	id: string;
	enteringYear: string;
	foreign: boolean;
	type: keyof typeof GroupType;
	name: string;
}

export interface GroupResponse {
	groups: Array<Group>;
}

export const GroupType = {
	bachelor: 'Б',
	master: 'М',
	specialist: 'С',
	phd: 'А',
};
