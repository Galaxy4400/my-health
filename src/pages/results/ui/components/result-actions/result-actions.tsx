import css from './result-actions.module.scss';
import { Button } from 'shared/ui/components';
import { Appointment } from 'widgets/appointment';
import { AddToCard, Print, SendToEmail } from 'widgets/results';

export const ResultActions = () => {
	return (
		<div className={css['main']}>
			<div className={css['block']}>
				<div className={css['title-block']}>
					<h5 className={css['title']}>Хотите получить подробный отчёт с рекомендациями?</h5>
				</div>
				<div className={css['actions']}>
					<SendToEmail />
					<Print />
					<AddToCard />
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
