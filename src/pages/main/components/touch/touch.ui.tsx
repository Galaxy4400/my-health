import css from './touch.module.scss';
import { Container } from 'shared/ui/components';
import circle from 'shared/assets/img/circle.svg';
import hand from 'shared/assets/img/hand.svg';

export const Touch = () => {
	return (
		<div className={css['main']}>
			<Container>
				<div className={css['body']}>
					<h4 className={css['title']}>Коснитесь экрана, чтобы начать</h4>
					<div className={css['button-container']}>
						<div className={css['circle']}>
							<img src={circle} />
						</div>
						<div className={css['hand']}>
							<img src={hand} />
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};
