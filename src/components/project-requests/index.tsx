import { apiSlice, useGetProjectRequestsQuery } from '@store/api';
import { Table } from 'antd';
import { tableProps } from './constants';
import { useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { RequestService } from '@services/request';

export const ProjectRequests: React.FC<{ projectId: string }> = ({
	projectId,
}) => {
	const { data, isLoading } = useGetProjectRequestsQuery(projectId);
	const dispatch = useDispatch();

	const handleApprove = useCallback(
		async (id: string) => {
			try {
				await RequestService.approveRequest(id);
				dispatch(
					apiSlice.util.invalidateTags(['ProjectRequests', 'ProjectUsers'])
				);
			} catch {
				toast.error('При одобрении заявки произошла ошибка');
			}
		},
		[dispatch]
	);
	const handleReject = useCallback(
		async (id: string) => {
			try {
				await RequestService.rejectRequest(id);
				dispatch(
					apiSlice.util.invalidateTags(['ProjectRequests', 'ProjectUsers'])
				);
			} catch {
				toast.error('При одобрении заявки произошла ошибка');
			}
		},
		[dispatch]
	);

	const columns = useMemo(
		() => tableProps(handleApprove, handleReject),
		[handleApprove, handleReject]
	);

	return (
		<>
			<Table
				columns={columns}
				dataSource={data?.requests ?? []}
				loading={isLoading}></Table>
		</>
	);
};
