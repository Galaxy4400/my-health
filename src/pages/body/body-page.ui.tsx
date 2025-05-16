import css from './body-page.module.scss';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { Measure } from 'widgets/measure';
import { Gender } from 'shared/api/patient';
import { selectPatientData, useAbortPatient } from 'entities/patient/patient-data';
import { useAppSelector } from 'shared/lib/store';
import man from 'shared/assets/img/measure/man.png';
import woman from 'shared/assets/img/measure/woman.png';
import { useMeasure } from 'shared/hooks';
import { useEffect } from 'react';
import { useVoice } from 'app/providers/voice';
import { selectApplicationPhrases, selectOverrideData } from 'entities/application';
import { OverrideBody } from 'widgets/results';

export const BodyPage = () => {
	const { startMeasure } = useMeasure();
	const patient = useAppSelector(selectPatientData);
	const phrases = useAppSelector(selectApplicationPhrases);
	const overrideData = useAppSelector(selectOverrideData);
	const { speak } = useVoice();
	const { abort } = useAbortPatient();

	useEffect(() => {
		speak(phrases.examination_step1);
	}, [phrases.examination_step1, speak]);

	return (
		<Container>
			<PageHead>
				<Button onClick={abort} width="big">
					В начало
				</Button>
			</PageHead>
			<Steps current={2} />
			<TitleBlock
				className={css['title']}
				title="Анализ тела"
				label="Встаньте на весы, положите руки на электроды, как показано на рисунке"
			/>
			<figure className={css['img']}>
				<img src={patient.gender === Gender.male ? man : woman} alt="patient" />
			</figure>
			<Measure
				action={() => startMeasure(1, patient.visit_id || 0, overrideData)}
				override={(isComplete, reboot) => <OverrideBody onClick={reboot} isComplete={isComplete} />}
				nextStep={path.puls()}
				nextDelayTime={15000}
			/>
		</Container>
	);
};
