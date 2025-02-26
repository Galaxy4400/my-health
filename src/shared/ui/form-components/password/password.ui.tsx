import css from './password.module.scss';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';

interface PasswordProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Password = ({ name, label, className, ...rest }: PasswordProps) => {
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
			<input className={cn(css['input'], className)} {...register(name)} type="password" {...rest} />
			{!!errors[name] && <p className={css['error']}>{String(errors[name]?.message)}</p>}
		</label>
	);
};
