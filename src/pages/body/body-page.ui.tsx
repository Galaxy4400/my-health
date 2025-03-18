import css from './body-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, TitleBlock, WarningPopup } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { Measure } from 'widgets/measure';
import { Gender } from 'shared/api/patient';
import { selectPatientData } from 'entities/patient/patient-data';
import { useAppSelector } from 'shared/lib/store';
import man from 'shared/assets/img/measure/man.png';
import woman from 'shared/assets/img/measure/woman.png';
import { useMeasure } from 'shared/hooks';

export const BodyPage = () => {
	const navigate = useNavigate();
	const { startMeasure } = useMeasure();
	const patient = useAppSelector(selectPatientData);

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
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
			<Measure action={() => startMeasure(1, patient.visit_id || 0)} nextStep={path.puls()} />
		</Container>
	);
};
