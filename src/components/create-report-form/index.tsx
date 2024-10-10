import { useCallback, useState } from 'react';
import { CreateReportFormProps } from './interfaces';
import { Controller, useForm } from 'react-hook-form';
import { CreateProjectReport } from '@services/project';
import { useDropzone } from 'react-dropzone';
import {
	ProjectFormInputWrapper,
	StyledDropzone,
	StyledFile,
} from '@components/create-project-form/styles';
import { Button, Input, Typography } from 'antd';
import { useUser } from '@hooks/use-user';
import { CloseOutlined } from '@ant-design/icons';

export const CreateReportForm: React.FC<CreateReportFormProps> = ({
	onSubmit,
}) => {
	const [files, setFiles] = useState<File | null>(null);
	const user = useUser();

	const onDrop = useCallback((acceptedFiles: Array<File>) => {
		setFiles(acceptedFiles[0]);
	}, []);

	const { control, handleSubmit } = useForm<Pick<CreateProjectReport, 'text'>>({
		defaultValues: {
			text: '',
		},
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		//@ts-ignore
		//resolver: yupResolver(createProjectSchema),
	});

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
	});

	const removeFile = useCallback(() => {
		setFiles(null);
	}, []);

	const handleCreate = (): void => {
		void (async (): Promise<void> => {
			await handleSubmit(
				async (form: Pick<CreateProjectReport, 'text'>): Promise<void> => {
					if (files)
						onSubmit({
							...form,
							projectId: '',
							date: new Date(Date.now()).toISOString(),
							file: files,
							authorId: user?.id ?? '',
						});
				}
			)();
		})();
	};

	return (
		<ProjectFormInputWrapper>
			<Typography.Title>Создать отчёт</Typography.Title>
			<Controller
				name="text"
				control={control}
				render={({ field }) => (
					<Input.TextArea
						placeholder="Текст отчета"
						onChange={field.onChange}
						value={field.value}
						required
						rows={8}
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
				Создать
			</Button>
		</ProjectFormInputWrapper>
	);
};
