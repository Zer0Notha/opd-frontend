import { createProjectSchema } from '@schemas/create-project-schema';
import { CreateProjectFormProps } from './interfaces';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateProject } from '@services/project';
import { Controller, useForm } from 'react-hook-form';
import { ProjectFormInputWrapper, StyledDropzone, StyledFile } from './styles';
import { Button, Input, Select, Typography, Form } from 'antd';
import { useDropzone } from 'react-dropzone';
import { useCallback, useState } from 'react';
import { CloseOutlined } from '@ant-design/icons';
import { INITIAL_VALUES } from './constants';

export const CreateProjectForm: React.FC<CreateProjectFormProps> = ({
	onSubmit,
	defaultValues = INITIAL_VALUES,
	buttonText = 'Создать проект',
}) => {
	const [files, setFiles] = useState<File | null>(null);
	const [filesError, setFilesError] = useState<String | null>(null);

	const onDrop = useCallback((acceptedFiles: Array<File>) => {
		setFiles(acceptedFiles[0]);
	}, []);

	const { control, handleSubmit, formState: { errors } } = useForm<CreateProject>({
		defaultValues,
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		resolver: yupResolver(createProjectSchema),
	});

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		accept: {
			'image/jpeg': ['.jpeg', '.jpg'],
			'image/png': ['.png']
		},
		maxSize: 10 * 1024 * 1024 // ограничение 10мб на файл
	});

	const removeFile = useCallback(() => {
		setFiles(null);
	}, []);

	const handleCreate = (): void => {
		void (async (): Promise<void> => {
			await handleSubmit(async (form: CreateProject): Promise<void> => {
				if (files && files?.type) {
					setFilesError(null);
					onSubmit({ ...form, file: files })
				 } else {
				 setFilesError('Пожалуйста загрузите постер');
				}
			})();
		})();
	};

	return (
		<ProjectFormInputWrapper>
			<Typography.Title>Создать проект</Typography.Title>
			<Form.Item
			hasFeedback
			validateStatus={errors.name ? 'error' : ''}
			help={errors.name?.message}
			>
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<Input
							placeholder="Название проекта"
							size="large"
							onChange={field.onChange}
							value={field.value}
						/>
					)}
				/>
			</Form.Item>
			<Form.Item
			hasFeedback
			validateStatus={errors.description ? 'error' : ''}
			help={errors.description?.message}
			>
			<Controller
				name="description"
				control={control}
				render={({ field }) => (
					<Input.TextArea
						placeholder="Описание"
						onChange={field.onChange}
						value={field.value}
						size="large"
						rows={5}
						style={{ resize: 'none' }}
					/>
				)}
			/>
			</Form.Item>
			<Form.Item
			hasFeedback
			validateStatus={errors.type ? 'error' : ''}
			help={errors.type?.message}
			>
				<Controller
					name="type"
					control={control}
					render={({ field }) => (
						<Select
							value={field.value}
							onChange={field.onChange}
							size="large"
							options={[
								{ value: 'scientific', label: 'Научный' },
								{ value: 'technical', label: 'Технический' },
								{ value: 'service', label: 'Сервисный' },
							]}
						/>
					)}
				/>
			</Form.Item>

			<Form.Item
			hasFeedback
			validateStatus={errors.maxUserNum ? 'error' : ''}
			help={errors.maxUserNum?.message}
			>
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
			</Form.Item>

			<Form.Item
			hasFeedback
			validateStatus={errors.problem ? 'error' : ''}
			help={errors.problem?.message}
			>
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
			</Form.Item>

			<Form.Item
			hasFeedback
			validateStatus={errors.wayOfSolving ? 'error' : ''}
			help={errors.wayOfSolving?.message}
			>
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
			</Form.Item>
			
			{files && (
				<StyledFile>
					<Typography>{files.name}</Typography>
					<CloseOutlined onClick={() => removeFile()} />
				</StyledFile>
			)}

			<Form.Item
			validateStatus={filesError ? 'error' : ''}
			help={filesError}
			>
				<StyledDropzone {...getRootProps({ className: 'dropzone' })}>
					<input {...getInputProps()} />
					<Typography.Text>Кликните сюда или перетащите постер проекта</Typography.Text>
					<Typography.Text disabled>Поддерживаемые форматы (.png .jpg .jpeg)</Typography.Text>
				</StyledDropzone>
			</Form.Item>

			<Button type="primary" size="large" onClick={handleCreate}>
				{buttonText}
			</Button>
		</ProjectFormInputWrapper>
	);
};
