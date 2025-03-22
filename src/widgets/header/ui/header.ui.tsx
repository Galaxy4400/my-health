import css from './header.module.scss';
import { Container } from 'shared/ui/components';
import logo from 'shared/assets/img/logo.png';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';

export const Header = () => {
	const navigate = useNavigate();

	return (
		<header className={css['header']}>
			<Container className={css['container']} width={1080}>
				<div className={css['body']} onClick={() => navigate(path.start())}>
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
