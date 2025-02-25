import css from './button.module.scss';
import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	loading?: boolean;
}

export const Button = ({ className, type = 'button', children, label, loading, ...rest }: ButtonProps) => {
	return (
		<button className={cn(className, css['button'], loading ? 'loading' : '')} type={type} {...rest}>
			{label || children}
		</button>
	);
};
