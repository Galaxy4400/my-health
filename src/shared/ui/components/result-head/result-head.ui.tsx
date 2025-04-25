import { useAppSelector } from 'shared/lib/store';
import css from './result-head.module.scss';
import { selectPatientData } from 'entities/patient/patient-data';

export const ResultHead = () => {
	const patientData = useAppSelector(selectPatientData);

	return (
		<div className={css['title']}>
			<p className={css['text']}>Ваш идентификатор для будущих обследований:</p>
			<p className={css['code']}>{patientData.visitor_id}</p>
			<p className={css['text']}>Запомните или запишите его у себя</p>
		</div>
	);
};
