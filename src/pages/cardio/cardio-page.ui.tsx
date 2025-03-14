import css from './cardio-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { Measure } from 'widgets/measure';
import img1 from 'shared/assets/img/measure/tonometr.png';
import img2 from 'shared/assets/img/measure/pulsococsimetr.png';
import { useMeasure } from 'shared/hooks';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from 'entities/patient/patient-data';

export const CardioPage = () => {
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
			<Steps current={3} />
			<TitleBlock className={css['title']} title="Давайте измерим ваше давление и пульс" />
			<div className={css['items']}>
				<div className={css['item']}>
					<h5 className={css['label']}>Вставьте руку в тонометр так, как показано на рисунке.</h5>
					<img className={css['img']} src={img1} alt="image1" />
				</div>
				<div className={css['item']}>
					<h5 className={css['label']}>
						Вставьте указательный палец любой руки в пульсоксиметр, как показано на рисунке:
					</h5>
					<img className={css['img']} src={img2} alt="image2" />
				</div>
			</div>
			<Measure action={() => startMeasure(2, patient.visit_id || 0)} nextStep={path.finish()} />
		</Container>
	);
};
