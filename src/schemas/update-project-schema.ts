import { object, string } from 'yup';

export const updateProjectSchema = object({
	name: string().required('Это поле является обязательным'),
	description: string().required('Это поля является обязательным'),

	type: string().required('Это поле является обязательным'),
	problem: string().required(),
	wayOfSolving: string().required(),
}).required();
