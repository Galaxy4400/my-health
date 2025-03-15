import css from './sport.module.scss';
import { Loader, MainValue, ResultHead } from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import { Gender, patient3dModelRequest, SportPageData, patientSportRequest } from 'shared/api/patient';
import { useEffect, useState } from 'react';

export const Sport = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<SportPageData | null>(null);
	const patient = useAppSelector(selectPatientData);
	const [modelUrl, setModelUrl] = useState<string | null>(null);

	useEffect(() => {
		patient3dModelRequest(patient.visit_id).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		patientSportRequest(patient.visit_id)
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
				<MainValue className={css['main-value']} title="Советы по тренировкам и SPA-процедурам:" />
				<div className={css['content-wrapper']}>
					<div className={css['content']} dangerouslySetInnerHTML={{ __html: data.content }} />
				</div>
			</div>
			{modelUrl && <PatientModel url={modelUrl} />}
		</div>
	);
};
