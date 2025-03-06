import css from './result-head.module.scss';

export const ResultHead = () => {
	return (
		<div className={css['main']}>
			<p className={css['patient']}>
				Пациент: <span>Константинопольский К.К. (М)</span>
			</p>
			<p className={css['age']}>
				Полных лет: <span>52</span>
			</p>
		</div>
	);
};
