import css from './button.module.scss';
import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	loading?: boolean;
	size?: 'default' | 'small';
	color?: 'primary' | 'second';
}

export const Button = ({
	className,
	type = 'button',
	size = 'default',
	color = 'primary',
	children,
	label,
	loading,
	...rest
}: ButtonProps) => {
	return (
		<button
			className={cn(className, css['button'], loading ? 'loading' : '', size, color)}
			type={type}
			{...rest}
		>
			{label || children}
		</button>
	);
};
