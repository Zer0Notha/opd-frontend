import { CreateProject } from '@services/project';

export interface CreateProjectFormProps {
	onSubmit: (form: CreateProject) => void;
	defaultValues?: CreateProject;
	buttonText?: string | React.ReactNode;
}
