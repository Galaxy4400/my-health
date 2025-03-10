import css from './body-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useMeasure } from '../lib';
import { Measure } from 'widgets/measure';
import { Sex } from 'shared/api/patient';
import { selectPatientData } from 'entities/patient/patient-data';
import { useAppSelector } from 'shared/lib/store';
import man from 'shared/assets/img/measure/man.png';
import woman from 'shared/assets/img/measure/woman.png';

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
			<Steps current={4} />
			<TitleBlock
				className={css['title']}
				title="Измерение состава тела и обмена веществ"
				label={
					<span>
						Мы используем метод биоимпедансного анализа. Это совершенно безопасно.
						<br />
						Положите ладони на электроды, как показано на рисунке:
					</span>
				}
			/>
			<figure className={css['img']}>
				<img src={patient.sex === Sex.man ? man : woman} alt="patient" />
			</figure>
			<Measure action={startMeasure} nextStep={path.finish()} />
		</Container>
	);
};
