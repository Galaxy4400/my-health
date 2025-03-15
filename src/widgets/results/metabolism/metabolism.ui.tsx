import { Gender, metabolicPatient, model3dPatient, ResultPageData } from 'shared/api/patient';
import css from './metabolism.module.scss';
import {
	GradientValue,
	Loader,
	MainValue,
	ResultHead,
	ValueItem,
	ValueList,
	WarningPopup,
} from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import { useEffect, useState } from 'react';

export const Metabolism = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<ResultPageData | null>(null);
	const patient = useAppSelector(selectPatientData);
	const [modelUrl, setModelUrl] = useState<string | null>(null);

	useEffect(() => {
		setLoading(true);

		model3dPatient(patient.visit_id).then((results) => {
			setModelUrl(results.url);
		});

		metabolicPatient(patient.visit_id)
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
			</div>
			{modelUrl && <PatientModel url={modelUrl} />}
		</div>
	);
};
