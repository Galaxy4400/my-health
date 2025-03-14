import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import css from './summary.module.scss';
import { MainValue, PulsCircle, ResultHead, TabsButton } from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { model3dPatient, SummaryPageData, summaryPatient } from 'shared/api/patient';
import { ResultPage } from 'shared/types';
import { useEffect, useState } from 'react';

const TABS_INDEXES = [ResultPage.body, ResultPage.metabolism, ResultPage.stress, ResultPage.cardio];

export const Summary = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<SummaryPageData | null>(null);
	const patient = useAppSelector(selectPatientData);
	const [modelUrl, setModelUrl] = useState<string | null>(null);

	useEffect(() => {
		model3dPatient(patient.visit_id).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		summaryPatient(patient.visit_id)
			.then((results) => {
				setData(results);
			})
			.finally(() => setLoading(false));
	}, [patient.visit_id]);

	if (!data || loading) {
		return <div>Нет данных</div>;
	}

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				{/* <ResultHead patient="Константинопольский К.К. (М)" age="52" /> */}
				<MainValue
					className={css['main-value']}
					valueTitle={data.score.label}
					color={data.score.color}
					status={data.score.title}
					value={data.score.value}
				/>
				<div className={css['buttons']}>
					{data.items.map((item, i) => (
						<TabsButton className={css['btn']} index={TABS_INDEXES[i]} key={i}>
							<div className={css['btn-head']}>
								<h5 className={css['btn-title']}>{item.label}:</h5>
							</div>
							<div className={css['btn-value']}>
								<PulsCircle
									color={item.color}
									status={item.title}
									value={item.value}
									diameter={85}
									fontSize={18}
								/>
							</div>
						</TabsButton>
					))}
				</div>
			</div>
			{modelUrl && <PatientModel url={modelUrl} />}
		</div>
	);
};
