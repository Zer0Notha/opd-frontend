import { useMemo } from 'react';
import { tableProps } from './constants';
import { ProjectRequest } from '@services/request';
import { Table } from 'antd';

export const UserRequests: React.FC<{
	requests: ProjectRequest[];
	isLoading: boolean;
}> = ({ requests, isLoading }) => {
	const columns = useMemo(() => tableProps(), []);

	return (
		<>
			<Table
				columns={columns}
				dataSource={requests}
				loading={isLoading}></Table>
		</>
	);
};
