import css from './measure-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, MeasureStatus, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useState } from 'react';
import { useMeasure } from '../lib';

import { MeasureBtn } from 'widgets/measure-btn';

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
			<MeasureStatus isComplete={isComplete} />
			<MeasureBtn action={startMeasure} onSuccess={() => setIsComplete(true)} nextStep={path.start()} />
		</Container>
	);
};
