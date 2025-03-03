import css from './cardio-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, MeasureStatus, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useState } from 'react';
import { useMeasure } from '../lib';
import { Measure } from 'widgets/measure';
import img1 from 'shared/assets/img/measure/tonometr.png';
import img2 from 'shared/assets/img/measure/pulsococsimetr.png';

export const CardioPage = () => {
	const [isComplete, setIsComplete] = useState(false);
	const navigate = useNavigate();
	const { startMeasure } = useMeasure();

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
			<MeasureStatus isComplete={isComplete} />
			<Measure action={startMeasure} onSuccess={() => setIsComplete(true)} nextStep={path.body()} />
		</Container>
	);
};
