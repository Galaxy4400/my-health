import { OptionProps } from 'shared/types';
import { ChartRangeType } from './types';

export const rangeTypeOptions: OptionProps[] = [
	{ label: 'По неделям', value: ChartRangeType.week },
	{ label: 'По месяцам', value: ChartRangeType.month },
	{ label: 'По годам', value: ChartRangeType.year },
];
