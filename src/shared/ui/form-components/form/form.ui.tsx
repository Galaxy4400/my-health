/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
import { useKeyboard } from 'app/providers/keyboard';
import { FormEvent, forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useRef } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { RequestData } from 'shared/api';

interface FormProps extends PropsWithChildren {
	className?: string;
	defaultValues?: Record<string, string | number>;
	onSubmit: (submittedData: RequestData) => void;
	onChange?: (event: FormEvent<HTMLFormElement>) => void;
	resolver?: any;
	context?: Record<string, unknown>;
}

export interface FormRef {
	getValues: () => any;
	formElement: HTMLFormElement | null;
}

export const Form = forwardRef<FormRef, FormProps>(
	({ className, defaultValues, resolver, context, onSubmit, onChange, children, ...rest }, ref) => {
		const methods = useForm({ defaultValues, resolver, context, mode: 'onChange' });
		const { handleSubmit, setValue, trigger, getValues } = methods;
		const { toggleOnChange, inputNode } = useKeyboard();

		const formElementRef = useRef<HTMLFormElement | null>(null);

		useImperativeHandle(ref, () => ({
			getValues,
			formElement: formElementRef.current,
		}));

		useEffect(() => {
			setValue(inputNode?.name || '', inputNode?.value || '', {
				shouldValidate: true,
				shouldDirty: true,
			});
			trigger(inputNode?.name);
		}, [setValue, inputNode?.name, inputNode?.value, toggleOnChange, trigger]);

		return (
			<FormProvider {...{ ...methods, onSubmit }}>
				<form
					ref={formElementRef}
					className={className}
					onSubmit={handleSubmit(onSubmit)}
					onChange={(event) => onChange?.(event)}
					autoComplete="off"
					{...rest}
				>
					{children}
				</form>
			</FormProvider>
		);
	},
);
