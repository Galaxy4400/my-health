import css from './risk.module.scss';
import { patient3dModelRequest, RisksPageData, patientRisksRequest } from 'shared/api/patient';
import { GradientValue, Loader, MainValue, ResultHead, ValueItem, ValueList } from 'shared/ui/components';
import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'shared/lib/store';

export const Risk = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<RisksPageData | null>(null);
	const [modelUrl, setModelUrl] = useState<string | null>(null);
	const patient = useAppSelector(selectPatientData);

	useEffect(() => {
		patient3dModelRequest(patient.visit_id).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		patientRisksRequest(patient.visit_id)
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
				<ResultHead />
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
									historyLink={status.historyLink}
									indicatorImageLink={status.indicatorImageLink}
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
