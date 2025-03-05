import { Appointment } from 'features/results';
import css from './result-actions.module.scss';
import { Button } from 'shared/ui/components';

export const ResultActions = () => {
	return (
		<div className={css['main']}>
			<div className={css['block']}>
				<div className={css['title-block']}>
					<h5 className={css['title']}>Хотите получить подробный отчёт с рекомендациями?</h5>
				</div>
				<div className={css['actions']}>
					<Button className={css['btn']} color="second">
						Отправить на email
					</Button>
					<Button className={css['btn']} color="second">
						Распечатать
					</Button>
					<Button className={css['btn']} color="second">
						Добавить в мед. карту
					</Button>
				</div>
			</div>
			<div className={css['block']}>
				<div className={css['title-block']}>
					<h5 className={css['title']}>
						Записаться на консультацию
						<br />к врачу?
					</h5>
					<p className={css['label']}>
						Запишитесь на приём через
						<br />
						интернет
					</p>
				</div>
				<div className={css['actions']}>
					<Appointment
						trigger={(action) => (
							<Button className={css['btn']} color="second" onClick={action}>
								Открыть сервис записи
							</Button>
						)}
					/>
				</div>
			</div>
		</div>
	);
};
