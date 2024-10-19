import { object, string } from 'yup';

export const authSchema = object({
	email: string().email('Введите корректный email').required('Введите email'),
	password: string().required('Введите пароль'),
}).required();
