import { CreateProjectForm } from '@components/create-project-form';
import { FlexLayout } from '@components/flex';
import { withNavigation } from '@hocs/with-navigation';
import { RouterName } from '@router/interfaces';
import { CreateProject, ProjectService } from '@services/project';
import { apiSlice } from '@store/api';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const CreateProjectPage = withNavigation(() => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleCreateProject = useCallback(
		//
		async (form: CreateProject) => {
			try {
				await ProjectService.createProject(form);
				dispatch(apiSlice.util.invalidateTags(['ProjectList']));
				navigate(RouterName.main);
			} catch (e) {
				toast.error((e as Error).message ?? 'Возникла ошибка при входе');
			}
		},
		[dispatch, navigate]
	);

	return (
		<FlexLayout width="100%" justify="center" padding="30px 0 0 0">
			<FlexLayout width="50%">
				<CreateProjectForm onSubmit={handleCreateProject} />
			</FlexLayout>
		</FlexLayout>
	);
});
