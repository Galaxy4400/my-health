import css from './steps.module.scss';
import cn from 'classnames';

const steps: string[] = [
	'Данные пациента',
	'Состав тела и обмен веществ',
	'Пульс',
	'Давление',
	'Опрос',
	'Результаты',
];

export const Steps = ({ current }: { current: number }) => {
	return (
		<div className={css['steps']}>
			{steps.map((step, i) => (
				<div className={css['step']} key={i}>
					<div className={cn(css['number'], i + 1 <= current ? 'active' : '')}>{i + 1}</div>
					<span className={css['label']}>{step}</span>
				</div>
			))}
		</div>
	);
};
