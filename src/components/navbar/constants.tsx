import { RouterName } from '@router/interfaces';
import { Button, MenuProps } from 'antd';
import { Link } from 'react-router-dom';

export const items = (onExitClick: () => void): MenuProps['items'] => [
	{
		label: <Link to={RouterName.profile}>Профиль</Link>,
		key: '0',
	},
	{
		type: 'divider',
	},
	{
		label: <Button onClick={onExitClick}>Выйти</Button>,
		key: '1',
	},
];
