import css from './start-btn.module.scss';
import { path } from 'shared/lib/router';
import { NavLink } from 'react-router-dom';

export const StartBtn = () => {
	return (
		<div className={css['wrapper']}>
			<NavLink className={css['btn']} to={path.step1()}>
				Начать
			</NavLink>
		</div>
	);
};
