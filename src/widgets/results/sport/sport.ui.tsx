import css from './sport.module.scss';
import { Loader, MainValue, ResultHead } from 'shared/ui/components';
import { PatientModel, usePatientId } from 'entities/patient/patient-data';
import { patient3dModelRequest, SportPageData, patientSportRequest } from 'shared/api/patient';
import { useEffect, useState } from 'react';

export const Sport = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<SportPageData | null>(null);
	const [modelUrl, setModelUrl] = useState<string | null>(null);
	const { visitId } = usePatientId();

	useEffect(() => {
		patient3dModelRequest(visitId).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		patientSportRequest(visitId)
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
				<MainValue className={css['main-value']} title="Советы по тренировкам и SPA-процедурам:" />
				<div className={css['content-wrapper']}>
					<div className={css['content']} dangerouslySetInnerHTML={{ __html: data.content }} />
				</div>
			</div>
			{modelUrl && <PatientModel url={modelUrl} />}
		</div>
	);
};
