import css from './result-head.module.scss';
import { usePatientId } from 'entities/patient/patient-data';

export const ResultHead = () => {
	const { visitorId } = usePatientId();

	return (
		<>
			{visitorId && (
				<div className={css['title']}>
					<p className={css['text']}>Ваш идентификатор для будущих обследований:</p>
					<p className={css['code']}>{visitorId}</p>
					<p className={css['text']}>Запомните или запишите его у себя</p>
				</div>
			)}
		</>
	);
};
