import { CreateProject } from '@services/project';

export interface CreateProjectFormProps {
	onSubmit: (form: CreateProject) => void;
}
