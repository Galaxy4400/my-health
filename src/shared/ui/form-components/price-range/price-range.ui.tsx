import css from './price-range.module.scss';
import { Controller, useFormContext } from 'react-hook-form';
import { PriceRange as PriceRangeComponent } from './components';

interface PriceRangeProps {
	name: string;
	label?: string;
	lowPrice?: number;
	highPrice?: number;
}

export const PriceRange = ({ name, label, lowPrice, highPrice }: PriceRangeProps) => {
	const { control } = useFormContext();

	return (
		<label className={css['wraper']}>
			{label && <span className={css['label']}>{label}</span>}
			<Controller
				name={name}
				control={control}
				defaultValue={[lowPrice, highPrice]}
				render={({ field: { onChange, value } }) => (
					<PriceRangeComponent lowPrice={value[0]} highPrice={value[1]} onChange={onChange} />
				)}
			/>
		</label>
	);
};
