import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import css from './summary.module.scss';
import { MainValue, PulsCircle, ResultHead, TabsButton } from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { model3dPatient } from 'shared/api/patient';
import { ResultPage } from 'shared/types';
import { useEffect, useState } from 'react';

export const Summary = () => {
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
				<MainValue
					className={css['main-value']}
					valueTitle="Общая оценка:"
					color="#96D665"
					status="Хорошо"
					value="(7/10)"
				/>
				<div className={css['buttons']}>
					<TabsButton className={css['btn']} index={ResultPage.body}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Состав тела:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#96D665" diameter={85} fontSize={18} status="Хорошо" value="(8/10)" />
						</div>
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.metabolism}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Обмен веществ:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#F9EC5C" diameter={85} fontSize={18} status="Средне" value="(6/10)" />
						</div>
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.stress}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Стресс:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#96D665" diameter={85} fontSize={18} status="Хорошо" value="(8/10)" />
						</div>
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.cardio}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Сердечно-сосудистая система:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#F9EC5C" diameter={85} fontSize={18} status="Средне" value="(6/10)" />
						</div>
					</TabsButton>
				</div>
			</div>
			{modelUrl && <PatientModel url={modelUrl} />}
		</div>
	);
};
