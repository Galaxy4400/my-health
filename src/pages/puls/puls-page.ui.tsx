import css from './puls-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { Measure } from 'widgets/measure';
import { useMeasure } from 'shared/hooks';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from 'entities/patient/patient-data';
import img from 'shared/assets/img/measure/pulsococsimetr.png';
import { useEffect } from 'react';
import { useVoice } from 'app/providers/voice';
import { selectApplicationPhrases } from 'entities/application';

export const PulsPage = () => {
	const navigate = useNavigate();
	const { startMeasure } = useMeasure();
	const patient = useAppSelector(selectPatientData);
	const phrases = useAppSelector(selectApplicationPhrases);
	const { speak } = useVoice();

	useEffect(() => {
		speak(phrases.examination_step2);
	}, [phrases.examination_step2, speak]);

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
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
