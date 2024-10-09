import { createProjectSchema } from '@schemas/create-project-schema';
import { UpdateProjectProps } from './interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { UpdateProject } from '@services/project';
import { Controller, useForm } from 'react-hook-form';
import { Button, Input, Select } from 'antd';
import { INITIAL_VALUES } from './constants';
import { ProjectFormInputWrapper } from '@components/create-project-form/styles';

export const UpdateProjectForm: React.FC<UpdateProjectProps> = ({
	onSubmit,
	defaultValues = INITIAL_VALUES,
	buttonText = 'Изменить',
}) => {
	const { control, handleSubmit } = useForm<UpdateProject>({
		defaultValues,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		resolver: yupResolver(createProjectSchema),
	});

	const handleCreate = (): void => {
		void (async (): Promise<void> => {
			await handleSubmit(async (form: UpdateProject): Promise<void> => {
				onSubmit({ ...form, id: '' });
			})();
		})();
	};

	return (
		<ProjectFormInputWrapper>
			<Controller
				name="name"
				control={control}
				render={({ field }) => (
					<Input
						placeholder="Название проекта"
						onChange={field.onChange}
						value={field.value}
					/>
				)}
			/>
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<Input.TextArea
						placeholder="Описание"
						onChange={field.onChange}
						value={field.value}
						rows={5}
						style={{ resize: 'none' }}
					/>
				)}
			/>
			<Controller
				name="type"
				control={control}
				render={({ field }) => (
					<Select
						value={field.value}
						onChange={field.onChange}
						options={[
							{ value: 'scientific', label: 'Научный' },
							{ value: 'technical', label: 'Технический' },
							{ value: 'service', label: 'Сервисный' },
						]}
					/>
				)}
			/>

			<Controller
				name="problem"
				control={control}
				render={({ field }) => (
					<Input.TextArea
						placeholder="Какую проблему решает?"
						onChange={field.onChange}
						value={field.value}
						rows={5}
						style={{ resize: 'none' }}
					/>
				)}
			/>

			<Controller
				name="wayOfSolving"
				control={control}
				render={({ field }) => (
					<Input.TextArea
						placeholder="Способ решения"
						onChange={field.onChange}
						value={field.value}
						rows={5}
						style={{ resize: 'none' }}
					/>
				)}
			/>

			<Button type="primary" onClick={handleCreate}>
				{buttonText}
			</Button>
		</ProjectFormInputWrapper>
	);
};
