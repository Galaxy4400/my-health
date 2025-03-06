import css from './result-head.module.scss';

interface ResultHeadProps {
	patient: string;
	age: string;
}

export const ResultHead = ({ patient, age }: ResultHeadProps) => {
	return (
		<div className={css['main']}>
			<p className={css['patient']}>
				Пациент: <span>{patient}</span>
			</p>
			<p className={css['age']}>
				Полных лет: <span>{age}</span>
			</p>
		</div>
	);
};
