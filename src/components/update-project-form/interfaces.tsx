import { UpdateProject } from '@services/project';

export interface UpdateProjectProps {
	onSubmit: (form: UpdateProject) => void;
	defaultValues?: UpdateProject;
	buttonText?: string | React.ReactNode;
}
