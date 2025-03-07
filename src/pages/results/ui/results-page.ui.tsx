import css from './results-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, Tabs, TabsContainer } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { ResultActions, ResultButtons } from './components';
import { Body, Cardio, Metabolism, Nutrition, Risk, Sport, Stress, Summary } from 'widgets/results';

export const ResultsPage = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
					Завершить обследование
				</Button>
			</PageHead>
			<Steps current={5} />
			<Tabs active={1}>
				<div className={css['results']}>
					<TabsContainer index={1}>
						<Summary />
					</TabsContainer>
					<TabsContainer index={2}>
						<Body />
					</TabsContainer>
					<TabsContainer index={3}>
						<Metabolism />
					</TabsContainer>
					<TabsContainer index={4}>
						<Stress />
					</TabsContainer>
					<TabsContainer index={5}>
						<Cardio />
					</TabsContainer>
					<TabsContainer index={6}>
						<Risk />
					</TabsContainer>
					<TabsContainer index={7}>
						<Nutrition />
					</TabsContainer>
					<TabsContainer index={8}>
						<Sport />
					</TabsContainer>
				</div>
				<ResultButtons />
			</Tabs>
			<ResultActions />
		</Container>
	);
};
