import { createProjectSchema } from '@schemas/create-project-schema';
import { CreateProjectFormProps } from './interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateProject } from '@services/project';
import { Controller, useForm } from 'react-hook-form';
import { ProjectFormInputWrapper, StyledDropzone, StyledFile } from './styles';
import { Button, Input, Select, Typography } from 'antd';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { INITIAL_VALUES } from './constants';

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
	onSubmit,
	defaultValues = INITIAL_VALUES,
	buttonText = 'Создать',
}) => {
	const [files, setFiles] = useState<File | null>(null);

	const onDrop = useCallback((acceptedFiles: Array<File>) => {
		setFiles(acceptedFiles[0]);
	}, []);

	const { control, handleSubmit } = useForm<CreateProject>({
		defaultValues,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		resolver: yupResolver(createProjectSchema),
	});

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});

	const removeFile = useCallback(() => {
		setFiles(null);
	}, []);

	const handleCreate = (): void => {
		void (async (): Promise<void> => {
			await handleSubmit(async (form: CreateProject): Promise<void> => {
				if (files) onSubmit({ ...form, file: files });
			})();
		})();
	};

	return (
		<ProjectFormInputWrapper>
			<Typography.Title>Создать проект</Typography.Title>
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
				name="maxUserNum"
				control={control}
				render={({ field }) => (
					<Input
						placeholder="Максимальное число участников"
						onChange={field.onChange}
						value={field.value}
						type="number"
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

			{files && (
				<StyledFile>
					<Typography>{files.name}</Typography>
					<CloseOutlined onClick={() => removeFile()} />
				</StyledFile>
			)}

			<StyledDropzone {...getRootProps({ className: 'dropzone' })}>
				<input {...getInputProps()} />

				<Typography.Text>Кликните сюда или перетащите файлы</Typography.Text>
			</StyledDropzone>

			<Button type="primary" onClick={handleCreate}>
				{buttonText}
			</Button>
		</ProjectFormInputWrapper>
	);
};
