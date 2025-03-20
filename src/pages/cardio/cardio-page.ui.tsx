import css from './cardio-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { Measure } from 'widgets/measure';
import { useMeasure } from 'shared/hooks';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from 'entities/patient/patient-data';
import img from 'shared/assets/img/measure/tonometr.png';
import { useEffect } from 'react';
import { useVoice } from 'app/providers/voice';
import { selectApplicationPhrases } from 'entities/application';

export const CardioPage = () => {
	const navigate = useNavigate();
	const { startMeasure } = useMeasure();
	const patient = useAppSelector(selectPatientData);
	const phrases = useAppSelector(selectApplicationPhrases);
	const { speak } = useVoice();

	useEffect(() => {
		speak(phrases.examination_step3);
	}, [phrases.examination_step3, speak]);

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
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
			<Measure action={() => startMeasure(3, patient.visit_id || 0)} nextStep={path.finish()} />
		</Container>
	);
};
