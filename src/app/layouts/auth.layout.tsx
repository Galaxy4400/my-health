import css from './layouts.module.scss';
import { Outlet } from 'react-router-dom';

export const AuthLayout = () => {
	return (
		<div className={css['auth']}>
			<Outlet />
		</div>
	);
};
