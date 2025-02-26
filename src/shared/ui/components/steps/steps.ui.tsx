import css from './steps.module.scss';
import cn from 'classnames';

type Step = { no: number; label: string };

const steps: Step[] = [
	{ no: 1, label: 'Данные пациента' },
	{ no: 2, label: 'Рост и вес' },
	{ no: 3, label: 'Сердечно-сосудистая система' },
	{ no: 4, label: 'Состав тела и обмен веществ' },
	{ no: 5, label: 'Результаты' },
];

export const Steps = ({ current }: { current: number }) => {
	return (
		<div className={css['steps']}>
			{steps.map((step) => (
				<div className={css['step']} key={step.no}>
					<div className={cn(css['number'], step.no === current ? 'active' : '')}>{step.no}</div>
					<span className={css['label']}>{step.label}</span>
				</div>
			))}
		</div>
	);
};
