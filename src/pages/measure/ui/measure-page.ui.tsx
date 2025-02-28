import css from './measure-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, MeasureStatus, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useState } from 'react';
import { useMeasure } from '../lib';

import img from 'shared/assets/img/measure/man.png';
import { Measure } from 'widgets/measure';

export const MeasurePage = () => {
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
			<Steps current={2} />
			<TitleBlock
				className={css['title']}
				title="Встаньте, пожалуйста, на весы"
				label="Так, как показано на рисунке. Обувь можно не снимать."
			/>
			<figure className={css['img']}>
				<img src={img} alt="patient" />
			</figure>
			<MeasureStatus isComplete={isComplete} />
			<Measure action={startMeasure} onSuccess={() => setIsComplete(true)} nextStep={path.cardio()} />
		</Container>
	);
};
