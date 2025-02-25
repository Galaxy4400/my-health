import { Container } from 'shared/ui/components';
import css from './touch.module.scss';
import thumb from 'shared/assets/img/thumb.svg';

export const Touch = () => {
	return (
		<div className={css['main']}>
			<Container>
				<div className={css['body']}>
					<h4 className={css['title']}>Коснитесь экрана, чтобы начать</h4>
					<img className={css['thumb']} src={thumb} alt="thumb" />
				</div>
			</Container>
		</div>
	);
};
