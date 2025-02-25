/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RequestData } from 'shared/api';

interface FormProps extends PropsWithChildren {
	className?: string;
	defaultValues?: Record<string, string | number>;
	onSubmit: (submittedData: RequestData) => void;
	resolver?: any;
}

export const Form = ({ className, defaultValues, resolver, onSubmit, children, ...rest }: FormProps) => {
	const methods = useForm({ defaultValues, resolver });
	const { handleSubmit } = methods;

	return (
		<FormProvider {...{ ...methods, onSubmit }}>
			<form className={className} onSubmit={handleSubmit(onSubmit)} {...rest}>
				{children}
			</form>
		</FormProvider>
	);
};
