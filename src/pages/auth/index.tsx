import { AuthForm } from '@components/auth-form';
import { FlexLayout } from '@components/flex';
import { AuthService, LoginInfo } from '@services/auth';
import { useCallback } from 'react';

export const AuthPage = (): React.ReactElement => {
	const handleAuth = useCallback(
		//
		async (form: LoginInfo) => {
			try {
				await AuthService.login(form);
			} catch (e) {
				//toast.error((e as Error).message ?? 'Возникла ошибка при входе');
			}
		},
		[]
	);
	return (
		<FlexLayout height="100vh" width="100%" align="center" justify="center">
			<FlexLayout>
				<AuthForm onSubmit={handleAuth} />
			</FlexLayout>
		</FlexLayout>
	);
};
