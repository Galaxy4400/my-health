import css from './menu.module.scss';
import { NavLink } from 'react-router-dom';
import { path } from 'shared/lib/router';

export const Menu = () => {
	return (
		<nav className={css['menu']}>
			<ul className={css['list']}>
				<li className={css['item']}>
					<NavLink className={css['link']} to={path.home()}>
						Главная
					</NavLink>
				</li>
				<li>
					<NavLink className={css['link']} to={path.history()}>
						История
					</NavLink>
				</li>
				<li>
					<NavLink className={css['link']} to={path.analytics()}>
						Аналитика
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};
