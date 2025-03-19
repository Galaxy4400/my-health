import css from './input.module.scss';
import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import cn from 'classnames';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	dataType?: 'number' | 'email';
}

export const Input = ({ name, label, type = 'text', dataType, className, ...rest }: InputProps) => {
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
			<input
				className={cn(css['input'], className)}
				{...register(name)}
				type={type}
				{...rest}
				data-type={dataType}
			/>
			{/* {!!errors[name] && <p className={css['error']}>{String(errors[name]?.message)}</p>} */}
		</label>
	);
};
