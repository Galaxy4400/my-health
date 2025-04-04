import { useAppSelector } from 'shared/lib/store';
import css from './stress.module.scss';
import { GradientValue, Loader, MainValue, ValueItem, ValueList } from 'shared/ui/components';
import { PatientModel, selectPatientData, usePatientId } from 'entities/patient/patient-data';
import { useEffect, useState } from 'react';
import { Gender, ResultPageData, patientStressRequest } from 'shared/api/patient';

export const Stress = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<ResultPageData | null>(null);
	const patient = useAppSelector(selectPatientData);
	const patientId = usePatientId();

	useEffect(() => {
		setLoading(true);

		patientStressRequest(patientId)
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
			<PatientModel
				url={`3d/frames/man_organs.php?model=${patient.gender === Gender.male ? 'man' : 'woman'}&group=Brain`}
			/>
		</div>
	);
};
