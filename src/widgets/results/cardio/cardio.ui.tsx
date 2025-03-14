import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import css from './cardio.module.scss';
import { GradientValue, MainValue, ResultHead, ValueItem, ValueList } from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { useEffect, useState } from 'react';
import { cardioPatient, Gender, ResultPageData } from 'shared/api/patient';
import { useModal } from 'app/providers/modal';

export const Cardio = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<ResultPageData | null>(null);
	const patient = useAppSelector(selectPatientData);

	useEffect(() => {
		setLoading(true);

		cardioPatient(patient.visit_id)
			.then((results) => {
				setData(results);
			})
			.finally(() => setLoading(false));
	}, [patient.visit_id]);

	if (!data || loading) {
		return <div>Нет данных</div>;
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
				url={`3d/frames/man_organs.php?model=${patient.gender === Gender.male ? 'man' : 'woman'}&group=Heart`}
			/>
		</div>
	);
};
