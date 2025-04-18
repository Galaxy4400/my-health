import css from './risk.module.scss';
import { patient3dModelRequest, RisksPageData, patientRisksRequest } from 'shared/api/patient';
import { GradientValue, Loader, MainValue, ValueItem, ValueList } from 'shared/ui/components';
import { PatientModel, usePatientId } from 'entities/patient/patient-data';
import { useEffect, useState } from 'react';

export const Risk = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<RisksPageData | null>(null);
	const [modelUrl, setModelUrl] = useState<string | null>(null);
	const patientId = usePatientId();

	useEffect(() => {
		patient3dModelRequest(patientId).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		patientRisksRequest(patientId)
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
				{/* <ResultHead patient="Константинопольский К.К. (М)" age="52" /> */}
				<MainValue className={css['main-value']} title="Факторы риска:" />
				<div className={css['content-wrapper']}>
					<ValueList>
						{data.statuses.map((status, i) => (
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
					<div className={css['recomentations']}>
						<h3 className={css['recomentations-title']}>Рекомендации:</h3>
						<div dangerouslySetInnerHTML={{ __html: data.content }} />
					</div>
				</div>
			</div>
			{modelUrl && <PatientModel url={modelUrl} />}
		</div>
	);
};
