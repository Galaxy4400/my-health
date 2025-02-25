import css from './header.module.scss';
import { Container } from 'shared/ui/components';
import logo from 'shared/assets/img/logo.svg';

export const Header = () => {
	return (
		<header className={css['header']}>
			<Container className={css['container']}>
				<div className={css['body']}>
					<div className={css['logo']}>
						<img src={logo} alt="logo" />
					</div>
					<div className={css['title']}>
						<h1>Моё здоровье</h1>
						<p>Пройдите экспресс-диагностику вашего здоровья</p>
					</div>
				</div>
			</Container>
		</header>
	);
};
