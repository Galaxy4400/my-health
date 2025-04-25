import { patientMetabolicRequest, patient3dModelRequest, ResultPageData } from 'shared/api/patient';
import css from './metabolism.module.scss';
import { GradientValue, Loader, MainValue, ResultHead, ValueItem, ValueList } from 'shared/ui/components';
import { PatientModel, usePatientId } from 'entities/patient/patient-data';
import { useEffect, useState } from 'react';

export const Metabolism = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<ResultPageData | null>(null);
	const [modelUrl, setModelUrl] = useState<string | null>(null);
	const patientId = usePatientId();

	useEffect(() => {
		setLoading(true);

		patient3dModelRequest(patientId).then((results) => {
			setModelUrl(results.url);
		});

		patientMetabolicRequest(patientId)
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
