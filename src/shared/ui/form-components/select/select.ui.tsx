import { HTMLAttributes } from 'react';
import css from './select.module.scss';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSelect from 'react-select';
import { OptionProps } from 'shared/types';

interface SelectProps extends HTMLAttributes<HTMLElement> {
	name: string;
	label?: string;
	defaultValue?: string | number;
	options: OptionProps[];
	placeholder?: string;
}

export const Select = ({ name, options, label, defaultValue, ...rest }: SelectProps) => {
	const {
		control,
		formState: { errors },
	} = useFormContext();

	return (
		<label className={css['wraper']}>
			{label && <span className={css['label']}>{label}</span>}
			<Controller
				name={name}
				control={control}
				defaultValue={defaultValue}
				render={({ field }) => (
					<ReactSelect
						options={options}
						value={options.find((option) => option.value === field.value) || null}
						// @ts-expect-error: Ignore type error for onChange
						onChange={(selectedOption) => field.onChange(selectedOption?.value || null)}
						onBlur={field.onBlur}
						{...rest}
					/>
				)}
			/>
			{!!errors[name] && <p className={css['error']}>{String(errors[name]?.message)}</p>}
		</label>
	);
};
