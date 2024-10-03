import { number, object, string } from 'yup';

export const createProjectSchema = object({
	name: string().required('Это поле является обязательным'),
	description: string().required('Это поля является обязательным'),

	type: string().required('Это поле является обязательным'),
	maxUserNum: number().required(),
	problem: string().required(),
	wayOfSolving: string().required(),
}).required();
