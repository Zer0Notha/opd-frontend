import { object, string } from 'yup';

export const authSchema = object({
	email: string().email().required('Это поле является обязательным'),
	password: string().required('Это поля является обязательным'),
}).required();
