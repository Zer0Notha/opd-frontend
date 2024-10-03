import { object, string } from 'yup';

export const registerSchema = object({
	email: string().email().required('Это поле является обязательным'),
	password: string().required('Это поле является обязательным'),
	vk: string().required('Это поле является обязательным'),
	groupId: string().required('Это поле является обязательным'),
	firstName: string().required('Это поле является обязательным'),
	secondName: string().required('Это поле является обязательным'),
	patronymic: string(),
}).required();
