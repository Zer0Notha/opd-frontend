import { RegisterInfo, RegisterInfoWithConfirm } from '@services/auth';
import { RegisterFormProps } from './interfaces';
import { Controller, useForm } from 'react-hook-form';
import { registerSchema } from '@schemas/register-schema';
import { yupResolver } from '@hookform/resolvers/yup';
import { RegisterFormInputWrapper } from './styles';
import { Button, Input, Select, Typography, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { useMemo } from 'react';
import { RouterName } from '@router/interfaces';
import { Link } from 'react-router-dom';

export const RegisterForm: React.FC<RegisterFormProps> = ({
	onSubmit,
	groupData,
}) => {
	const { control, handleSubmit, formState: { errors } } = useForm<RegisterInfoWithConfirm>({
		resolver: yupResolver(registerSchema),
	});

	const handleAuth = (): void => {
		void (async (): Promise<void> => {
			await handleSubmit(async (form: RegisterInfoWithConfirm): Promise<void> => {
				const { confirmPassword, ...rest } = form; // Извлекаем confirmPassword и сохраняем остальные поля в rest
				onSubmit(rest as RegisterInfo);
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
			<Form.Item 
			hasFeedback
			validateStatus={errors.email ? 'error' : ''}
			help={errors.email?.message}
			>
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
			</Form.Item>
			<Form.Item
			hasFeedback
			validateStatus={errors.password ? 'error' : ''}
			help={errors.password?.message}
			>
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
			</Form.Item>
			<Form.Item
			hasFeedback
			validateStatus={errors.confirmPassword ? 'error' : ''}
			help={errors.confirmPassword?.message}
			>
				<Controller
					control={control}
					name="confirmPassword"
					render={({ field: { value, onChange }, fieldState: { error } }) => (
						<Input.Password
							size="large"
							placeholder="Подтвердите пароль"
							value={value}
							onChange={onChange}
							status={error ? 'error' : ''}
						/>
					)}
				/>
			</Form.Item>
			<Form.Item
			hasFeedback
			validateStatus={errors.vk ? 'error' : ''}
			help={errors.vk?.message}
			>
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
			</Form.Item>
			<Form.Item
			hasFeedback
			validateStatus={errors.groupId ? 'error' : ''}
			help={errors.groupId?.message}
			>
				<Controller
					control={control}
					name="groupId"
					render={({ field: { value, onChange }, fieldState: { error } }) => (
						<Select
							size="large"
							defaultValue={value}
							onChange={onChange}
							placeholder="Группа"
							options={groupOptions}
							status={error ? 'error' : ''}
						/>
					)}
				/>
			</Form.Item>
			<Form.Item
			hasFeedback
			validateStatus={errors.firstName ? 'error' : ''}
			help={errors.firstName?.message}
			>
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
			</Form.Item>
			<Form.Item
			hasFeedback
			validateStatus={errors.secondName ? 'error' : ''}
			help={errors.secondName?.message}
			>
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
			</Form.Item>
			<Form.Item>
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
			</Form.Item>

			<Button type="primary" size="large" onClick={handleAuth}>
				Зарегистрироваться
			</Button>
			<Form.Item>
				<Typography.Link>
					<Link to={RouterName.auth}>Уже есть аккаунт? Войти</Link>
				</Typography.Link>
			</Form.Item>
		</RegisterFormInputWrapper>
	);
};
