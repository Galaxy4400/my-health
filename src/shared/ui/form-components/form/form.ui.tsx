/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { FormEvent, forwardRef, PropsWithChildren } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RequestData } from 'shared/api';

interface FormProps extends PropsWithChildren {
	className?: string;
	defaultValues?: Record<string, string | number>;
	onSubmit: (submittedData: RequestData) => void;
	onChange?: (event: FormEvent<HTMLFormElement>) => void;
	resolver?: any;
}

// Используем forwardRef для проброса ref внутрь формы
export const Form = forwardRef<HTMLFormElement, FormProps>(
	({ className, defaultValues, resolver, onSubmit, onChange, children, ...rest }, ref) => {
		const methods = useForm({ defaultValues, resolver, mode: 'onChange' });
		const { handleSubmit } = methods;

		return (
			<FormProvider {...{ ...methods, onSubmit }}>
				<form
					ref={ref}
					className={className}
					onSubmit={handleSubmit(onSubmit)}
					onChange={(event) => onChange?.(event)}
					{...rest}
				>
					{children}
				</form>
			</FormProvider>
		);
	},
);
