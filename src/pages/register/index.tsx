import { FlexLayout } from '@components/flex';
import { RegisterForm } from '@components/register-form';
import { AuthService, RegisterInfo } from '@services/auth';
import { apiSlice } from '@store/api';
import { useGetGroupListQuery } from '@store/api/group/group-slice';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

export const RegisterPage = (): React.ReactElement => {
	const { data: groupData } = useGetGroupListQuery();

	const dispatch = useDispatch();

	const handleAuth = useCallback(
		//
		async (form: RegisterInfo) => {
			try {
				await AuthService.register(form);
				dispatch(apiSlice.util.invalidateTags(['MyInfo']));
			} catch (e) {
				console.log(e)
			}
		},
		[dispatch]
	);
	return (
		<FlexLayout height="100vh" width="100%" align="center" justify="center">
			<FlexLayout>
				<RegisterForm
					onSubmit={handleAuth}
					groupData={groupData?.groups ?? []}
				/>
			</FlexLayout>
		</FlexLayout>
	);
};
