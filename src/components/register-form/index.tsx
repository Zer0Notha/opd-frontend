import { RegisterInfo } from '@services/auth';
import { RegisterFormProps } from './interfaces';
import { Controller, useForm } from 'react-hook-form';
import { registerSchema } from '@schemas/register-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormInputWrapper } from './styles';
import { Button, Input, Select, Typography } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMemo } from 'react';

export const RegisterForm: React.FC<RegisterFormProps> = ({
	onSubmit,
	groupData,
}) => {
	const { control, handleSubmit } = useForm<RegisterInfo>({
		defaultValues: {
			email: '',
			password: '',
			vk: '',
			groupId: '',
			firstName: '',
			secondName: '',
			patronymic: '',
		},
		resolver: yupResolver(registerSchema),
	});

	const handleAuth = (): void => {
		void (async (): Promise<void> => {
			await handleSubmit(async (form: RegisterInfo): Promise<void> => {
				onSubmit(form);
			})();
		})();
	};

	const groupOptions = useMemo(
		() =>
			groupData.map((item) => ({
				value: item.id,
				label: `${item.name}-${item.type}${item.enteringYear}`,
			})),
		[groupData]
	);

	return (
		<RegisterFormInputWrapper>
			<Typography.Title level={2}>Регистрация</Typography.Title>
			<Controller
				control={control}
				name="email"
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<Input
						size="large"
						placeholder="Email"
						prefix={<UserOutlined />}
						value={value}
						onChange={onChange}
						status={error ? 'error' : ''}
					/>
				)}
			/>
			<Controller
				control={control}
				name="password"
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<Input.Password
						size="large"
						placeholder="Пароль"
						value={value}
						onChange={onChange}
						status={error ? 'error' : ''}
					/>
				)}
			/>

			<Controller
				control={control}
				name="vk"
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<Input
						size="large"
						placeholder="Ссылка на vk"
						value={value}
						onChange={onChange}
						status={error ? 'error' : ''}
					/>
				)}
			/>

			<Controller
				control={control}
				name="groupId"
				render={({ field: { value, onChange } }) => (
					<Select
						defaultValue={value}
						onChange={onChange}
						placeholder="Группа"
						options={groupOptions}
					/>
				)}
			/>

			<Controller
				control={control}
				name="firstName"
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<Input
						size="large"
						placeholder="Имя"
						value={value}
						onChange={onChange}
						status={error ? 'error' : ''}
					/>
				)}
			/>
			<Controller
				control={control}
				name="secondName"
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<Input
						size="large"
						placeholder="Фамилия"
						value={value}
						onChange={onChange}
						status={error ? 'error' : ''}
					/>
				)}
			/>
			<Controller
				control={control}
				name="patronymic"
				render={({ field: { value, onChange }, fieldState: { error } }) => (
					<Input
						size="large"
						placeholder="Отчество (при наличии)"
						value={value}
						onChange={onChange}
						status={error ? 'error' : ''}
					/>
				)}
			/>

			<Button type="primary" onClick={handleAuth}>
				Зарегистрироваться
			</Button>
		</RegisterFormInputWrapper>
	);
};
