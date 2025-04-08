import css from './puls-page.module.scss';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { Measure } from 'widgets/measure';
import { useMeasure } from 'shared/hooks';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData, useAbortPatient } from 'entities/patient/patient-data';
import { useEffect } from 'react';
import { useVoice } from 'app/providers/voice';
import { selectApplicationPhrases } from 'entities/application';
import img from 'shared/assets/img/measure/pulsococsimetr.png';
import { Navigate } from 'react-router-dom';

export const PulsPage = () => {
	const { startMeasure } = useMeasure();
	const patient = useAppSelector(selectPatientData);
	const phrases = useAppSelector(selectApplicationPhrases);
	const { speak } = useVoice();
	const { abort } = useAbortPatient();

	useEffect(() => {
		speak(phrases.examination_step2);
	}, [phrases.examination_step2, speak]);

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
			<Steps current={3} />
			<TitleBlock
				className={css['title']}
				title={
					<p>
						Давайте измерим
						<br />
						ваш пульс
					</p>
				}
			/>
			<div className={css['items']}>
				<div className={css['item']}>
					<h5 className={css['label']}>
						Вставьте указательный палец любой руки в пульсоксиметр,
						<br />
						как показано на рисунке:
					</h5>
					<img className={css['img']} src={img} alt="image" />
				</div>
			</div>
			<Measure action={() => startMeasure(2, patient.visit_id || 0)} nextStep={path.cardio()} />
		</Container>
	);
};
