import { RegisterInfo } from '@services/auth';
import { Group } from '@services/group';

export interface RegisterFormProps {
	onSubmit: (form: RegisterInfo) => void;
	groupData: Array<Group>;
}
