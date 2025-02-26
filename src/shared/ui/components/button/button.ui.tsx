import css from './button.module.scss';
import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	loading?: boolean;
	size?: 'default' | 'small';
	color?: 'primary' | 'second' | 'white';
	width?: 'auto' | 'big';
}

export const Button = ({
	className,
	type = 'button',
	size = 'default',
	color = 'primary',
	width = 'auto',
	children,
	label,
	loading,
	...rest
}: ButtonProps) => {
	return (
		<button
			className={cn(className, css['button'], loading ? 'loading' : '', size, color, width)}
			type={type}
			{...rest}
		>
			{label || children}
		</button>
	);
};
