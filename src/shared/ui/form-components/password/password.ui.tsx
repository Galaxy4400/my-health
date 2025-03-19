import css from './password.module.scss';
import cn from 'classnames';
import { InputHTMLAttributes, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { Icon } from 'shared/ui/icons';
import { Icons } from 'shared/types';

interface PasswordProps extends InputHTMLAttributes<HTMLInputElement> {
	label?: string;
}

export const Password = ({ name, label, className, ...rest }: PasswordProps) => {
	const [visible, setVisible] = useState(false);

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
			<div className={css['input-wrapper']}>
				<input
					className={cn(css['input'], className)}
					{...register(name)}
					type={visible ? 'text' : 'password'}
					autoComplete="new-password"
					{...rest}
				/>
				<div className={css['eye']} onClick={() => setVisible((prev) => !prev)}>
					<Icon name={Icons.eye} width={30} height={21} />
				</div>
			</div>
			{!!errors[name] && <p className={css['error']}>{String(errors[name]?.message)}</p>}
		</label>
	);
};
