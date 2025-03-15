import css from './risk.module.scss';
import { Gender, model3dPatient, RisksPageData, risksPatient } from 'shared/api/patient';
import {
	GradientValue,
	Loader,
	MainValue,
	Model3d,
	ResultHead,
	ValueItem,
	ValueList,
} from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import { useEffect, useState } from 'react';

export const Risk = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<RisksPageData | null>(null);
	const patient = useAppSelector(selectPatientData);
	const [modelUrl, setModelUrl] = useState<string | null>(null);

	useEffect(() => {
		model3dPatient(patient.visit_id).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		risksPatient(patient.visit_id)
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
				<MainValue className={css['main-value']} title="Факторы риска:" />
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
			{modelUrl && <PatientModel url={modelUrl} />}
		</div>
	);
};
