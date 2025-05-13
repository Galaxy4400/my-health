import css from './result-actions.module.scss';
import { Button } from 'shared/ui/components';
import { Appointment } from 'widgets/appointment';
import { AddToCard, Print, SendToEmail } from 'widgets/results';
import { useAppSelector } from 'shared/lib/store';
import { selectApplicationDevices, selectApplicationDoctor } from 'entities/application';

export const ResultActions = () => {
	const devices = useAppSelector(selectApplicationDevices);
	const doctorLink = useAppSelector(selectApplicationDoctor);

	const allEmpty = !devices['buttons.email'] && !devices['buttons.print'] && !devices['buttons.medcard'];

	return (
		<div className={css['main']}>
			{!allEmpty && (
				<div className={css['block']}>
					<div className={css['title-block']}>
						<h5 className={css['title']}>Хотите получить подробный отчёт с рекомендациями?</h5>
					</div>
					<div className={css['actions']}>
						{devices['buttons.email'] && <SendToEmail />}
						{devices['buttons.print'] && <Print />}
						{devices['buttons.medcard'] && <AddToCard />}
					</div>
				</div>
			)}
			{doctorLink && (
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
							link={doctorLink}
							trigger={(action) => (
								<Button className={css['btn']} color="second" onClick={action}>
									Открыть сервис записи
								</Button>
							)}
						/>
					</div>
				</div>
			)}
		</div>
	);
};
