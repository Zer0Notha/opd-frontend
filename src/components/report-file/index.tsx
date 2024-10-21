import { StyledFile } from '@components/create-project-form/styles';
import { ProjectService } from '@services/project';
import { useGetReportFileQuery } from '@store/api';
import { Skeleton, Typography } from 'antd';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

export const ReportFile: React.FC<{ id: string }> = ({ id }) => {
	const { data, isLoading } = useGetReportFileQuery(id);

	const handleDownload = useCallback(async (id: string) => {
		try {
			const blob = await ProjectService.downloadReportFile(id);

			const url = URL.createObjectURL(new Blob([blob]));

			window.open(url, 'отчет');
		} catch (e) {
			console.error(e);
			toast.error('Ошибка при скачивании файла');
		}
	}, []);

	if (isLoading) return <Skeleton />;

	return (
		<StyledFile cursor="pointer" onClick={() => handleDownload(id)}>
			<Typography>{data?.name}</Typography>
		</StyledFile>
	);
};
