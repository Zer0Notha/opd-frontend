import { object, string } from 'yup';

export const registerSchema = object({
	email: string().email('Введите корректный email').required('Введите email'),
	password: string().required('Введите пароль').min(6, 'Пароль должен содержать минимум 6 символов'),
	confirmPassword: string()
	.required('Подтвердите ваш пароль')
	.test('passwords-match', 'Пароли не совпадают', function(value) {
		const { password } = this.parent;
		return password === value;
	}),
	vk: string().required('Введите ссылку на vk'),
	groupId: string().required('Выберите вашу группу'),
	firstName: string().required('Введите ваше имя'),
	secondName: string().required('Введите вашу фамилию'),
	patronymic: string(),
}).required();
