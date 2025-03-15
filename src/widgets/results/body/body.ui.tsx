import { BodyPageData, bodyPatient, Gender, model3dPatient } from 'shared/api/patient';
import css from './body.module.scss';
import {
	GradientValue,
	Loader,
	MainValue,
	ResultHead,
	Tabs,
	TabsButton,
	TabsContainer,
	ValueGrid,
	ValueGridItem,
	ValueItem,
	ValueList,
} from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import { useEffect, useState } from 'react';

export const Body = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<BodyPageData | null>(null);
	const patient = useAppSelector(selectPatientData);
	const [modelUrl, setModelUrl] = useState<string | null>(null);

	useEffect(() => {
		model3dPatient(patient.visit_id).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		bodyPatient(patient.visit_id)
			.then((results) => {
				setData(results);
			})
			.finally(() => setLoading(false));
	}, [patient.visit_id]);

	if (!data || loading) {
		return <Loader isLoading={loading} />;
	}

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				{/* <ResultHead patient="Константинопольский К.К. (М)" age="52" /> */}
				<MainValue
					className={css['main-value']}
					title={data.score.label}
					color={data.score.color}
					status={data.score.title}
					value={data.score.value}
				/>
				<Tabs active={1}>
					<div className={css['buttons']}>
						<TabsButton className={css['btn']} index={1}>
							Основное
						</TabsButton>
						<TabsButton className={css['btn']} index={2}>
							Подробности
						</TabsButton>
						<TabsButton className={css['btn']} index={3}>
							Анализ жира
						</TabsButton>
					</div>
					<div className={css['containers']}>
						<TabsContainer index={1}>
							<div className={css['content-wrapper']}>
								<ValueList>
									{data.statuses_tab1.map((status, i) => (
										<ValueItem title={status.label} key={i}>
											<GradientValue
												title={status.title}
												value={status.value === false ? undefined : status.value}
												min={status.min === false ? undefined : status.min}
												max={status.max === false ? undefined : status.max}
												gradientColors={status.gradientColors}
											/>
										</ValueItem>
									))}
								</ValueList>
							</div>
						</TabsContainer>
						<TabsContainer index={2}>
							<div className={css['content-wrapper']}>
								<ValueList>
									{data.statuses_tab2.map((status, i) => (
										<ValueItem title={status.label} key={i}>
											<GradientValue
												title={status.title}
												value={status.value === false ? undefined : status.value}
												min={status.min === false ? undefined : status.min}
												max={status.max === false ? undefined : status.max}
												gradientColors={status.gradientColors}
											/>
										</ValueItem>
									))}
								</ValueList>
							</div>
						</TabsContainer>
						<TabsContainer index={3}>
							<div className={css['content-wrapper']}>
								<ValueGrid>
									{data.statuses_tab3.map((item, i) => (
										<ValueGridItem title={item.label} row={item.row} col={item.col} key={i}>
											{item.gradients.map((status, j) => (
												<GradientValue
													title={status.title}
													value={status.value === false ? undefined : status.value}
													min={status.min === false ? undefined : status.min}
													max={status.max === false ? undefined : status.max}
													gradientColors={status.gradientColors}
													key={j}
												/>
											))}
										</ValueGridItem>
									))}
								</ValueGrid>
							</div>
						</TabsContainer>
					</div>
				</Tabs>
			</div>
			{modelUrl && <PatientModel url={modelUrl} />}
		</div>
	);
};
