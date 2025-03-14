import css from './results-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, Tabs, TabsContainer } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { ResultActions, ResultButtons } from './components';
import { Body, Cardio, Metabolism, Nutrition, Risk, Sport, Stress, Summary } from 'widgets/results';
import { ResultPage } from 'shared/types';

export const ResultsPage = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
					Завершить исследование
				</Button>
			</PageHead>
			<Steps current={4} />
			<Tabs active={ResultPage.summary}>
				<div className={css['results']}>
					<TabsContainer index={ResultPage.summary}>
						<Summary />
					</TabsContainer>
					<TabsContainer index={ResultPage.body}>
						<Body />
					</TabsContainer>
					<TabsContainer index={ResultPage.metabolism}>
						<Metabolism />
					</TabsContainer>
					<TabsContainer index={ResultPage.stress}>
						<Stress />
					</TabsContainer>
					<TabsContainer index={ResultPage.cardio}>
						<Cardio />
					</TabsContainer>
					<TabsContainer index={ResultPage.risk}>
						<Risk />
					</TabsContainer>
					<TabsContainer index={ResultPage.nutrition}>
						<Nutrition />
					</TabsContainer>
					<TabsContainer index={ResultPage.sport}>
						<Sport />
					</TabsContainer>
				</div>
				<ResultButtons />
			</Tabs>
			<ResultActions />
		</Container>
	);
};
