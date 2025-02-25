import { InputHTMLAttributes } from 'react';
import css from './radio.module.scss';
import { useFormContext } from 'react-hook-form';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Radio = ({ name, value, label, ...rest }: RadioProps) => {
	const { register } = useFormContext();

	if (!name) {
		throw new Error("The 'name' prop is required for Hidden component.");
	}

	return (
		<label className={css['wrapper']}>
			<input className={css['input']} {...register(name)} value={value} type="radio" {...rest} />
			<div className={css['label']}>{label}</div>
		</label>
	);
};
