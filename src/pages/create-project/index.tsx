import { CreateProjectForm } from '@components/create-project-form';
import { withNavigation } from '@hocs/with-navigation';
import { CreateProject, ProjectService } from '@services/project';
import { apiSlice } from '@store/api';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

export const CreateProjectPage = withNavigation(() => {
	const dispatch = useDispatch();

	const handleCreateProject = useCallback(
		//
		async (form: CreateProject) => {
			try {
				await ProjectService.createProject(form);
				dispatch(apiSlice.util.invalidateTags(['MyInfo']));
			} catch (e) {
				toast.error((e as Error).message ?? 'Возникла ошибка при входе');
			}
		},
		[dispatch]
	);

	return (
		<>
			<CreateProjectForm onSubmit={handleCreateProject} />
		</>
	);
});
