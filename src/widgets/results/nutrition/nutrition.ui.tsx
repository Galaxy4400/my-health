import css from './nutrition.module.scss';
import { Loader, MainValue, ResultHead } from 'shared/ui/components';
import { PatientModel, selectPatientData, useVisitId } from 'entities/patient/patient-data';
import { useAppSelector } from 'shared/lib/store';
import { Gender, NutritionPageData, patientNutritionRequest } from 'shared/api/patient';
import { useEffect, useState } from 'react';

export const Nutrition = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<NutritionPageData | null>(null);
	const patient = useAppSelector(selectPatientData);
	const visitId = useVisitId();

	useEffect(() => {
		setLoading(true);

		patientNutritionRequest(visitId)
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
				<MainValue className={css['main-value']} title="Советы по питанию:" />
				<div className={css['content-wrapper']}>
					<div className={css['content']} dangerouslySetInnerHTML={{ __html: data.content }} />
				</div>
			</div>
			<PatientModel
				url={`3d/frames/man_organs.php?model=${patient.gender === Gender.male ? 'man' : 'woman'}&group=Intestines`}
			/>
		</div>
	);
};
