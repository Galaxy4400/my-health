import css from './finish-page.module.scss';
import { Navigate, useNavigate } from 'react-router-dom';
import {
	BtnWithProgress,
	Button,
	Container,
	Loader,
	PageHead,
	Steps,
	TitleBlock,
} from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useMeasure } from '../lib';
import { useEffect, useState } from 'react';
import cn from 'classnames';

const deleyTime = 3000;

export const FinishPage = () => {
	const navigate = useNavigate();
	const [delayCount, setDelayCount] = useState(0);
	const [isComplete, setIsComplete] = useState(false);
	const { startMeasure, loading } = useMeasure();

	const countStep = 10;

	useEffect(() => {
		startMeasure().then(() => setIsComplete(true));
	}, []);

	useEffect(() => {
		if (!isComplete) return;

		const interval = setInterval(() => {
			setDelayCount((prev) => prev + countStep);
		}, countStep);

		return () => clearInterval(interval);
	}, [isComplete, navigate]);

	if (delayCount >= deleyTime) {
		return <Navigate to={path.results()} />;
	}

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
					В начало
				</Button>
			</PageHead>
			<Steps current={4} />
			{loading ? (
				<>
					<TitleBlock
						className={css['title']}
						title="Исследование завершено"
						label={
							<span>
								Поздравляем! Вы заботитесь о своём здоровье - Вы великолепны.
								<br />
								Сейчас мы формируем отчёт. Когда он будет готов, мы сообщим Вам.
							</span>
						}
					/>
					<div className={css['loader-container']}>
						<Loader className={css['loader']} text="Формируем отчёт" isLoading={true} />
					</div>
				</>
			) : (
				<>
					<TitleBlock
						className={css['title']}
						title="Исследование завершено"
						label={'Результаты готовы. Нажмите на кнопку для просмотра:'}
					/>
					<BtnWithProgress
						className={cn(css['btn'])}
						text="Результаты"
						onClick={() => navigate(path.results())}
						curValue={delayCount}
						totalValue={deleyTime}
					/>
				</>
			)}
		</Container>
	);
};
