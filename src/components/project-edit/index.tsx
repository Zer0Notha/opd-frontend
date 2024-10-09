import { FlexLayout } from '@components/flex';
import { UpdateProjectForm } from '@components/update-project-form';
import { Project, ProjectService, UpdateProject } from '@services/project';
import { ProjectRequest } from '@services/request';
import { apiSlice } from '@store/api';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const ProjectEdit = () => {
	const { id } = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { project } = useOutletContext<{
		project?: Project;
		myRequests: Array<ProjectRequest>;
		isLoading: boolean;
		isMyRequestsLoading: boolean;
	}>();

	const handleUpdateValues = useCallback(
		async (values: UpdateProject) => {
			try {
				await ProjectService.updateProject({ ...values, id: id ?? '' });
				dispatch(apiSlice.util.invalidateTags(['Project', 'ProjectList']));
				navigate(`/project/${id}`);
			} catch {
				toast.error('При обновлении данных произошла ошибка');
			}
		},
		[id, dispatch, navigate]
	);

	return (
		<FlexLayout width="100%" align="center" justify="center">
			<FlexLayout width="60%">
				<UpdateProjectForm
					onSubmit={handleUpdateValues}
					defaultValues={{
						name: project?.name ?? '',
						description: project?.description ?? '',
						type: project?.type ?? 'scientific',
						problem: project?.problem ?? '',
						wayOfSolving: project?.wayOfSolving ?? '',
						id: id ?? '',
					}}
					buttonText="Изменить"
				/>
			</FlexLayout>
		</FlexLayout>
	);
};
