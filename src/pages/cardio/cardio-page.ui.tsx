import css from './cardio-page.module.scss';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { Measure } from 'widgets/measure';
import { useMeasure } from 'shared/hooks';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData, useAbortPatient } from 'entities/patient/patient-data';
import { useEffect } from 'react';
import { useVoice } from 'app/providers/voice';
import { selectApplicationDevices, selectApplicationPhrases } from 'entities/application';
import img from 'shared/assets/img/measure/tonometr.png';
import { Navigate } from 'react-router-dom';

export const CardioPage = () => {
	const { startMeasure } = useMeasure();
	const devices = useAppSelector(selectApplicationDevices);
	const patient = useAppSelector(selectPatientData);
	const phrases = useAppSelector(selectApplicationPhrases);
	const { speak } = useVoice();
	const { abort } = useAbortPatient();

	useEffect(() => {
		speak(phrases.examination_step3);
	}, [phrases.examination_step3, speak]);

	if (!patient.visit_id) {
		return <Navigate to={path.start()} />;
	}

	return (
		<Container>
			<PageHead>
				<Button onClick={abort} width="big">
					В начало
				</Button>
			</PageHead>
			<Steps current={4} />
			<TitleBlock
				className={css['title']}
				title={
					<p>
						Давайте измерим
						<br />
						ваше давление
					</p>
				}
			/>
			<div className={css['items']}>
				<div className={css['item']}>
					<h5 className={css['label']}>
						Вставьте руку в тонометр так,
						<br />
						как показано на рисунке.
					</h5>
					<img className={css['img']} src={img} alt="image" />
				</div>
			</div>
			<Measure
				action={() => startMeasure(3, patient.visit_id || 0)}
				nextStep={devices.questionnaire ? path.examination() : path.results()}
			/>
		</Container>
	);
};
