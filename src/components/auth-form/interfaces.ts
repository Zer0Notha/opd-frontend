import { LoginInfo } from '@services/auth';

export interface AuthFormProps {
	onSubmit: (form: LoginInfo) => void;
}
