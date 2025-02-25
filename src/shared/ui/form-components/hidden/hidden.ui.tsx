import { InputHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';

export const Hidden = ({ name, ...rest }: InputHTMLAttributes<HTMLInputElement>) => {
	const { register } = useFormContext();

	if (!name) {
		throw new Error("The 'name' prop is required for Hidden component.");
	}

	return <input {...register(name)} {...rest} type="hidden" />;
};
