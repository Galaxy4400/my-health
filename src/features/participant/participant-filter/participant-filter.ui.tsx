import css from './participant-filter.module.scss';
import { useState } from 'react';
import cn from 'classnames';

type Periods = 'today' | 'week' | 'month' | 'all';
type Period = { label: string; value: Periods };

const periods: Period[] = [
	{ label: 'Сегодня', value: 'today' },
	{ label: 'Эта неделя', value: 'week' },
	{ label: 'Этот месяц', value: 'month' },
	{ label: 'Все время', value: 'all' },
];

export const ParticipantFilter = () => {
	const [selectedPeriod, setSelectedPeriod] = useState<Periods>('today');

	return (
		<div className={css['main']}>
			<h4 className={css['label']}>Период:</h4>
			<div className={css['body']}>
				{periods.map(({ label, value }) => (
					<button
						className={cn(css['btn'], selectedPeriod === value ? 'active' : '')}
						onClick={() => setSelectedPeriod(value)}
						key={value}
					>
						{label}
					</button>
				))}
			</div>
		</div>
	);
};
