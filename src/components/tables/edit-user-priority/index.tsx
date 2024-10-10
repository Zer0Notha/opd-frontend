import { RouterName } from '@router/interfaces';
import {
	ProjectRequest,
	ProjectRequestStatus,
	RequestService,
} from '@services/request';
import { Table, TableProps, Tag, Typography } from 'antd';
import { CSS } from '@dnd-kit/utilities';
import { Link } from 'react-router-dom';
import {
	arrayMove,
	SortableContext,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
	DndContext,
	DragEndEvent,
	PointerSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import { useCallback, useMemo, useState } from 'react';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import React from 'react';
import { debounce } from '@utils/debounce';
import { toast } from 'react-toastify';

export const tableProps = (): TableProps<ProjectRequest>['columns'] => [
	{
		title: 'Проект',
		dataIndex: 'project',
		render: (_, record: ProjectRequest) => (
			<>
				<Link to={RouterName.project.replace(':id', record.projectId)}>
					<Typography.Text>{record.project.name}</Typography.Text>
				</Link>
			</>
		),
	},
	{
		title: 'Приоритет',
		dataIndex: 'priority',
	},
	{
		title: 'Статус',
		dataIndex: 'status',
		render: (status) => (
			<Tag>
				{ProjectRequestStatus[status as keyof typeof ProjectRequestStatus]}
			</Tag>
		),
	},
];

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
	'data-row-key': string;
}

const Row: React.FC<Readonly<RowProps>> = (props) => {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: props['data-row-key'],
	});

	const style: React.CSSProperties = {
		...props.style,
		transform: CSS.Translate.toString(transform),
		transition,
		cursor: 'move',
		...(isDragging ? { position: 'relative', zIndex: 9999 } : {}),
	};

	return (
		<tr
			{...props}
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
		/>
	);
};

export const EditUserPriority: React.FC<{
	requests: ProjectRequest[];
	isLoading: boolean;
}> = React.memo(({ requests, isLoading }) => {
	const [dataSource, setDataSource] = useState<Array<ProjectRequest>>(requests);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				// https://docs.dndkit.com/api-documentation/sensors/pointer#activation-constraints
				distance: 1,
			},
		})
	);

	const onDragEnd = useCallback(async ({ active, over }: DragEndEvent) => {
		if (active.id !== over?.id) {
			setDataSource((prev: Array<ProjectRequest>) => {
				const activeIndex = prev.findIndex((i) => i.priority === active.id);
				const overIndex = prev.findIndex((i) => i.priority === over?.id);
				const array = arrayMove(prev, activeIndex, overIndex).map(
					(item, index) => ({ ...item, priority: index + 1 })
				);

				debounce(async () => {
					try {
						await RequestService.updateRequestPriority(
							array.map((item) => ({
								id: item.id,
								priority: item.priority,
							}))
						);
					} catch {
						toast.error('Ошибка при сохранении приоритетов');
					}
				}, 1000);

				return array;
			});
		}
	}, []);

	const columns = useMemo(() => tableProps(), []);

	return (
		<DndContext
			sensors={sensors}
			modifiers={[restrictToVerticalAxis]}
			onDragEnd={onDragEnd}>
			<SortableContext
				// rowKey array
				items={dataSource.map((i) => i.priority)}
				strategy={verticalListSortingStrategy}>
				<Table<ProjectRequest>
					components={{
						body: { row: Row },
					}}
					rowKey="priority"
					columns={columns}
					loading={isLoading}
					dataSource={dataSource}
				/>
			</SortableContext>
		</DndContext>
	);
});
