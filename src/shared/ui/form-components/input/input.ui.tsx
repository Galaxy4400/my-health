import { InputHTMLAttributes } from 'react';
import css from './input.module.scss';
import { useFormContext } from 'react-hook-form';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Input = ({ name, label, type = 'text', ...rest }: InputProps) => {
	const {
		register,
		formState: { errors },
	} = useFormContext();

	if (!name) {
		throw new Error("The 'name' prop is required for Hidden component.");
	}

	return (
		<label className={css['wraper']}>
			{label && <span className={css['label']}>{label}</span>}
			<input className={css['input']} {...register(name)} type={type} {...rest} />
			{!!errors[name] && <p className={css['error']}>{String(errors[name]?.message)}</p>}
		</label>
	);
};
