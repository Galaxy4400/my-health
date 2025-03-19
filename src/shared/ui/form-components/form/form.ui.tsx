/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { useKeyboard } from 'app/providers/keyboard';
import { FormEvent, forwardRef, PropsWithChildren, useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RequestData } from 'shared/api';

interface FormProps extends PropsWithChildren {
	className?: string;
	defaultValues?: Record<string, string | number>;
	onSubmit: (submittedData: RequestData) => void;
	onChange?: (event: FormEvent<HTMLFormElement>) => void;
	resolver?: any;
}

export const Form = forwardRef<HTMLFormElement, FormProps>(
	({ className, defaultValues, resolver, onSubmit, onChange, children, ...rest }, ref) => {
		const methods = useForm({ defaultValues, resolver, mode: 'onChange' });
		const { handleSubmit, setValue, trigger } = methods;
		const { toggleOnChange, inputNode } = useKeyboard();

		useEffect(() => {
			setValue(inputNode?.name || '', inputNode?.value || '', { shouldValidate: true, shouldDirty: true });
			trigger(inputNode?.name);
		}, [setValue, inputNode?.name, inputNode?.value, toggleOnChange, trigger]);

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
