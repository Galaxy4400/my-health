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
import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useResults } from '../lib';
import { selectPatientData, useAbortPatient } from 'entities/patient/patient-data';
import { useAppSelector } from 'shared/lib/store';

const deleyTime = 3000;
const countStep = 10;

export const FinishPage = () => {
	const navigate = useNavigate();
	const [delayCount, setDelayCount] = useState(0);
	const { loading, isComplete } = useResults();
	const { abort } = useAbortPatient();
	const patient = useAppSelector(selectPatientData);

	useEffect(() => {
		if (!isComplete) return;

		const interval = setInterval(() => {
			setDelayCount((prev) => prev + countStep);
		}, countStep);

		return () => clearInterval(interval);
	}, [isComplete]);

	if (delayCount >= deleyTime) {
		return <Navigate to={path.results()} />;
	}

	if (!patient.visit_id) {
		return <Navigate to={path.start()} />;
	}

	return (
		<Container>
			<PageHead>
				<Button onClick={abort} width="big">
					В начало
				</Button>
			</PageHead>
			<Steps current={6} />
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
