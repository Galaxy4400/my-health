import css from './sport.module.scss';
import { MainValue, ResultHead } from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import { Gender, model3dPatient } from 'shared/api/patient';
import { useEffect, useState } from 'react';

export const Sport = () => {
	const patient = useAppSelector(selectPatientData);
	const [modelUrl, setModelUrl] = useState<string | null>(null);

	useEffect(() => {
		model3dPatient(patient.visit_id).then((results) => {
			setModelUrl(results.url);
		});
	}, [patient.visit_id]);

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				{/* <ResultHead patient="Константинопольский К.К. (М)" age="52" /> */}
				<MainValue className={css['main-value']} title="Советы по тренировкам и SPA-процедурам:" />
				<div className={css['content-wrapper']}>
					<div className={css['content']}>
						<div className={css['section']}>
							<h5 className={css['title']}>Спортивные нагрузки</h5>
							<div className={css['item']}>
								<h5 className={css['norecomend-title']}>Не рекомендуемые:</h5>
								<p>Тяжёлая атлетика, бег</p>
							</div>
							<div className={css['item']}>
								<h5 className={css['recomend-title']}>Рекомендуемые:</h5>
								<p>Плавание, ходьба, спортивная ходьба</p>
							</div>
						</div>
						<div className={css['section']}>
							<h5 className={css['title']}>SPA-процедуры</h5>
							<div className={css['item']}>
								<h5 className={css['norecomend-title']}>Не рекомендуемые:</h5>
								<p>Баня</p>
							</div>
							<div className={css['item']}>
								<h5 className={css['recomend-title']}>Рекомендуемые:</h5>
								<p>Массаж, прессотерапия</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			{modelUrl && <PatientModel url={modelUrl} />}
		</div>
	);
};
