import css from './results-page.module.scss';
import { Button, Container, PageHead, Steps, Tabs, TabsContainer, useTabs } from 'shared/ui/components';
import { ResultActions, ResultButtons } from './components';
import {
	Body,
	Cardio,
	Circulation,
	Metabolism,
	Nutrition,
	Risk,
	Spine,
	Sport,
	Stress,
	Summary,
} from 'widgets/results';
import { ResultPage } from 'shared/types';
import { selectPatientData, useAbortPatient } from 'entities/patient/patient-data';
import { Navigate } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { useAppSelector } from 'shared/lib/store';
import { selectSummeryPageStatus } from 'entities/application';
import cn from 'classnames';

export const ResultsPage = () => {
	const { abort } = useAbortPatient();
	const patient = useAppSelector(selectPatientData);
	const isSummery = useAppSelector(selectSummeryPageStatus);

	if (!patient.visit_id) {
		return <Navigate to={path.start()} />;
	}

	return (
		<Container>
			<PageHead>
				<Button onClick={abort} width="big">
					Завершить исследование
				</Button>
			</PageHead>
			<Steps current={6} />
			<Tabs active={ResultPage.summary}>
				<div className={cn(css['results'], isSummery ? 'is-summery' : '')}>
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
					<TabsContainer index={ResultPage.spine}>
						<Spine />
					</TabsContainer>
					<TabsContainer index={ResultPage.circulation}>
						<Circulation />
					</TabsContainer>
				</div>
				<ResultButtons />
			</Tabs>
			<ResultActions />
		</Container>
	);
};
