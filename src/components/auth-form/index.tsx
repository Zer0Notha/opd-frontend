import { yupResolver } from '@hookform/resolvers/yup';
import { authSchema } from '@schemas/auth-schema';
import { LoginInfo } from '@services/auth';
import { Controller, useForm } from 'react-hook-form';
import { AuthFormProps } from './interfaces';
import { AuthFormInputWrapper } from './styles';
import { Button, Input, Typography, Form } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { RouterName } from '@router/interfaces';

export const AuthForm: React.FC<AuthFormProps> = ({ onSubmit }) => {
	const { control, handleSubmit, formState: { errors } } = useForm<LoginInfo>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: yupResolver(authSchema),
	});

	const handleAuth = (): void => {
		void (async (): Promise<void> => {
			await handleSubmit(async (form: LoginInfo): Promise<void> => {
				onSubmit(form);
			})();
		})();
	};

	return (
		<AuthFormInputWrapper>
			<Typography.Title level={2}>Авторизация</Typography.Title>
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

			<Button type="primary" size="large" onClick={handleAuth}>
				Войти
			</Button>

			<Form.Item>
				<Typography.Link>
					<Link to={RouterName.register}>Нет аккаунта?</Link>
				</Typography.Link>
			</Form.Item>
		</AuthFormInputWrapper>
	);
};
