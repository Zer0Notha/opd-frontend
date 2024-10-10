import { Project } from '@services/project';
import { Table } from 'antd';
import { tableProps } from './constants';
import { useMemo } from 'react';

export const UserProjects: React.FC<{
	projects: Array<Project>;
	isLoading: boolean;
}> = ({ projects, isLoading }) => {
	const columns = useMemo(() => tableProps(), []);
	return (
		<>
			<Table columns={columns} dataSource={projects} loading={isLoading} />
		</>
	);
};
