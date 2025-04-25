import { BodyPageData, patientBodyRequest, Gender, patient3dModelRequest } from 'shared/api/patient';
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
import { PatientModel, usePatientId } from 'entities/patient/patient-data';
import { useEffect, useState } from 'react';

export const Body = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<BodyPageData | null>(null);
	const [modelUrl, setModelUrl] = useState<string | null>(null);
	const { visitId } = usePatientId();

	useEffect(() => {
		patient3dModelRequest(visitId).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		patientBodyRequest(visitId)
			.then((results) => {
				setData(results);
			})
			.finally(() => setLoading(false));
	}, [visitId]);

	if (!data || loading) {
		return <Loader isLoading={loading} />;
	}

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead />
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
