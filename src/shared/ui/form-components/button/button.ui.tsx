/* eslint-disable no-unused-vars */
import { ButtonHTMLAttributes } from 'react';
import { Button as ButtonComponent } from '../../components/button';
import { useFormContext, UseFormReturn } from 'react-hook-form';
import { RequestData } from 'shared/api';
import cn from 'classnames';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
	label?: string;
	isReset?: boolean;
	isTrigger?: boolean;
	loading?: boolean;
	size?: 'default' | 'small';
	color?: 'primary' | 'second' | 'white';
	width?: 'auto' | 'big';
}

export const Button = ({
	className = '',
	type = 'button',
	size = 'default',
	color = 'primary',
	width = 'auto',
	children,
	label,
	isReset = false,
	isTrigger = false,
	loading,
	...rest
}: ButtonProps) => {
	const { reset, handleSubmit, onSubmit } = useFormContext() as UseFormReturn & {
		onSubmit: (submittedData: RequestData) => void;
	};

	const clickHandler = () => {
		if (isReset) reset();

		if (isTrigger) handleSubmit(() => onSubmit({}))();
	};

	return (
		<ButtonComponent
			className={className}
			type={type}
			loading={loading}
			onClick={clickHandler}
			size={size}
			color={color}
			width={width}
			{...rest}
		>
			{label || children}
		</ButtonComponent>
	);
};
