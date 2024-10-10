import { CreateProjectReport } from '@services/project';

export interface CreateReportFormProps {
	onSubmit: (form: CreateProjectReport) => void;
}
