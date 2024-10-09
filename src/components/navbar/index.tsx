import { useUser } from '@hooks/use-user';
import { RouterKeys } from '@router/interfaces';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { NavOption } from './interfaces';
import { useCallback, useMemo } from 'react';
import { Navigation } from '@components/navigation';
import { FlexLayout } from '@components/flex';
import { Button, Dropdown, Typography } from 'antd';
import { items } from './constants';

export const Navbar = ({
	hideOptions,
	active,
}: {
	hideOptions: boolean;
	active?: RouterKeys;
}): React.ReactElement => {
	const navigate = useNavigate();
	const location = useLocation();

	//const isMobile = useMedia({ maxWidth: '576px' });

	const user = useUser();

	const optionMap: Array<NavOption> = useMemo(
		() => (hideOptions ? [] : []),
		[hideOptions]
	);

	const filteredOptions = useMemo(() => {
		return optionMap.map((item) => {
			const matches =
				matchPath(location.pathname, item.link) || item.name === active;
			return { ...item, selected: Boolean(matches) };
		});
	}, [location, optionMap, active]);

	const handleNavigate = useCallback(
		(link: string) => {
			navigate(link);
		},
		[navigate]
	);

	return (
		<Navigation
			logo={
				<FlexLayout onClick={() => handleNavigate('/')}>
					<Typography.Title level={4} color="inherit">
						PROJECT IATE
					</Typography.Title>
				</FlexLayout>
			}
			options={filteredOptions}
			onSelectOption={handleNavigate}
			footer={
				<>
					<Dropdown menu={{ items }}>
						<Button onClick={(e) => e.preventDefault()}>
							{user?.firstName} {user?.secondName}
						</Button>
					</Dropdown>
				</>
			}
		/>
	);
};
