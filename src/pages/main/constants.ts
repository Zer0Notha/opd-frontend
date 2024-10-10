import { MenuProps } from 'antd';

export const filterItems: MenuProps['items'] = [
	{
		key: 'all',
		label: 'Все проекты',
	},
	{
		key: 'status',
		label: 'По статусам проектов',
		type: 'group',
		children: [
			{
				key: 'opened',
				label: 'Набор открыт',
			},
			{
				key: 'closed',
				label: 'Набор закрыт',
			},
			{
				key: 'not_confirmed',
				label: 'На рассмотрении',
			},
			{
				key: 'rejected',
				label: 'Отклонено',
			},
		],
	},
	{
		key: 'type',
		label: 'По типам проектов',
		type: 'group',
		children: [
			{
				key: 'scientific',
				label: 'Научный',
			},
			{
				key: 'technical',
				label: 'Технический',
			},
			{
				key: 'service',
				label: 'Сервисный',
			},
		],
	},
];
