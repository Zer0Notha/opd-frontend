export interface User {
	id: string;
	email: string;
	firstName: string;
	secondName: string;
	patronymic: string;
	groupId: string;
	vk: string;
	role: keyof typeof UserRole;
}

export const UserRole = {
	student: 'student',
	teacher: 'teacher',
	admin: 'admin',
	mentor: 'mentor',
};
