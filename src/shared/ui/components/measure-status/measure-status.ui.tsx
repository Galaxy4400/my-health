import css from './banner.module.scss';
import { useModal } from 'app/providers/modal';
import banner from 'shared/assets/img/banner1.jpg';

export const MeasureStatus = ({ isComplete }: { isComplete: boolean }) => {
	return (
		<div className={css['main']}>
			{isComplete ? (
				<p className={css['complete']}>
					<span>Поздравляем!</span>
					<br />
					Измерение успешно завершено. Давайте перейдём к следующему шагу. Нажмите на кнопку:
				</p>
			) : (
				<p className={css['redy']}>Когда будете готовы - нажмите кнопку &quot;Измерить&quot;:</p>
			)}
		</div>
	);
};
