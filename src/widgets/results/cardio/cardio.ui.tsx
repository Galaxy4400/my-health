import { PatientModel, selectPatientData, usePatientId } from 'entities/patient/patient-data';
import css from './cardio.module.scss';
import { GradientValue, Loader, MainValue, ResultHead, ValueItem, ValueList } from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { useEffect, useState } from 'react';
import { patientCardioRequest, Gender, ResultPageData } from 'shared/api/patient';

export const Cardio = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<ResultPageData | null>(null);
	const patient = useAppSelector(selectPatientData);
	const patientId = usePatientId();

	useEffect(() => {
		setLoading(true);

		patientCardioRequest(patientId)
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
			<PatientModel
				url={`3d/frames/man_organs.php?model=${patient.gender === Gender.male ? 'man' : 'woman'}&group=Heart`}
			/>
		</div>
	);
};
