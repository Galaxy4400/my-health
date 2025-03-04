import css from './radio-component.module.scss';
import React, { PropsWithChildren, ReactElement, useEffect, useRef } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';

interface RadioProps extends PropsWithChildren {
	name: string;
	className?: string;
	value: number | string;
	defaultChecked?: boolean;
}

export const RadioComponent = ({ className, name, value, children, ...rest }: RadioProps) => {
	const { register, control } = useFormContext();
	const selectedValue = useWatch({ control, name });

	if (!name) {
		throw new Error("The 'name' prop is required for RadioComponent.");
	}

	const isChecked = selectedValue === value;

	return (
		<label className={className}>
			<input className={css['input']} {...register(name)} value={value} type="radio" {...rest} />
			{React.isValidElement(children)
				? React.cloneElement(children as ReactElement, {
						className:
							`${(children.props as { className?: string })?.className || ''} ${isChecked ? 'checked' : ''}`.trim(),
					})
				: children}
		</label>
	);
};
