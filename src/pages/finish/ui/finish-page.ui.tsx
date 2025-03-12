import css from './finish-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, Loader, PageHead, PulsBtn, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useMeasure } from '../lib';
import { useEffect } from 'react';

export const FinishPage = () => {
	const navigate = useNavigate();
	const { startMeasure, loading } = useMeasure();

	useEffect(() => {
		startMeasure();
	}, []);

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
					<PulsBtn className={css['btn']} onClick={() => navigate(path.results())}>
						Результаты
					</PulsBtn>
				</>
			)}
		</Container>
	);
};
