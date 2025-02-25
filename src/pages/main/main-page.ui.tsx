import css from './main-page.module.scss';
import { Slider, Touch } from './components';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';

export const MainPage = () => {
	const navigate = useNavigate();

	useEffect(() => {
		const clickHandler = () => {
			navigate(path.start());
		};

		document.addEventListener('click', clickHandler);

		return () => document.removeEventListener('click', clickHandler);
	}, [navigate]);

	return (
		<div className={css['main']}>
			<Slider />
			<Touch />
		</div>
	);
};
