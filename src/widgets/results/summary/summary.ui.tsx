import { PatientModel, usePatientId } from 'entities/patient/patient-data';
import css from './summary.module.scss';
import { Loader, MainValue, PulsCircle, ResultHead, TabsButton } from 'shared/ui/components';
import { patient3dModelRequest, SummaryPageData, patientSummaryRequest } from 'shared/api/patient';
import { ResultPage } from 'shared/types';
import { useEffect, useState } from 'react';

const TABS_INDEXES = [ResultPage.body, ResultPage.metabolism, ResultPage.stress, ResultPage.cardio];

export const Summary = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<SummaryPageData | null>(null);
	const [modelUrl, setModelUrl] = useState<string | null>(null);
	const patientId = usePatientId();

	useEffect(() => {
		patient3dModelRequest(patientId).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		patientSummaryRequest(patientId)
			.then((results) => {
				setData(results);
			})
			.finally(() => setLoading(false));
	}, [patientId]);

	if (!data || loading) {
		return <Loader isLoading={loading} />;
	}

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead />
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
								<h5 className={css['btn-title']}>{item.label}</h5>
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
