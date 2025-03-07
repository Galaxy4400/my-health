import css from './results-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, Tabs, TabsContainer } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { ResultActions, ResultButtons } from './components';
import { Body, Metabolism, Summary } from 'widgets/results';

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
					<TabsContainer index={4}>results 4</TabsContainer>
					<TabsContainer index={5}>results 5</TabsContainer>
					<TabsContainer index={6}>results 6</TabsContainer>
					<TabsContainer index={7}>results 7</TabsContainer>
					<TabsContainer index={8}>results 8</TabsContainer>
				</div>
				<ResultButtons />
			</Tabs>
			<ResultActions />
		</Container>
	);
};
