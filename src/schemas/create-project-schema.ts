import { number, object, string } from 'yup';

export const createProjectSchema = object({
	name: string().required('Укажите название проекта'),
	description: string().required('Введите описание проекта'),
	type: string().required('Выберите тип проекта'),
	maxUserNum: number()
	.required('Укажите количество человек в команде')
	.moreThan(0, "Количество человек в команде должно быть больше 0"),
	problem: string().required('Опишите проблему которую решает ваш проект'),
	wayOfSolving: string().required('Укажите предполагаемый путь решения проблемы'),
}).required();
