import { usePatientId } from 'entities/patient/patient-data';
import css from './result-actions.module.scss';
import { Button } from 'shared/ui/components';
import { Appointment } from 'widgets/appointment';
import { AddToCard, Print, SendToEmail } from 'widgets/results';
import { useAppSelector } from 'shared/lib/store';
import { selectApplicationDevices } from 'entities/application';

export const ResultActions = () => {
	const patientId = usePatientId();
	const devices = useAppSelector(selectApplicationDevices);

	const allEmpty = !devices['buttons.email'] && !devices['buttons.print'] && !devices['buttons.medcard'];

	return (
		<div className={css['main']}>
			{!allEmpty && (
				<div className={css['block']}>
					<div className={css['title-block']}>
						<h5 className={css['title']}>Хотите получить подробный отчёт с рекомендациями?</h5>
					</div>
					<div className={css['actions']}>
						{devices['buttons.email'] && <SendToEmail patientId={patientId || 0} />}
						{devices['buttons.print'] && <Print patientId={patientId || 0} />}
						{devices['buttons.medcard'] && <AddToCard patientId={patientId || 0} />}
					</div>
				</div>
			)}
			{devices['buttons.doctor'] && (
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
			)}
		</div>
	);
};
