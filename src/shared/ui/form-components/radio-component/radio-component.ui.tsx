import css from './radio-component.module.scss';
import { PropsWithChildren, useEffect, useRef } from 'react';
import { useFormContext } from 'react-hook-form';

interface RadioProps extends PropsWithChildren {
	name: string;
	className?: string;
	label?: string;
	value: number | string;
	defaultChecked?: boolean;
}

export const RadioComponent = ({ className, name, value, children, defaultChecked, ...rest }: RadioProps) => {
	const { register, setValue, watch } = useFormContext();

	const radioWrapperRef = useRef(null);
	const selectedValue = watch(name);

	useEffect(() => {
		const radioWrapper = radioWrapperRef.current as HTMLElement | null;

		const input = radioWrapper?.querySelector('input');

		const isChecked = selectedValue ? selectedValue === value : defaultChecked;

		if (!(input?.nextSibling instanceof Element)) {
			throw new Error("Expected input's next sibling to be an Element.");
		}

		if (isChecked) {
			input.nextSibling.classList.add('checked');
		} else {
			input.nextSibling.classList.remove('checked');
		}

		const clickHandler = () => {
			setValue(name, value);
		};

		radioWrapper?.addEventListener('mousedown', clickHandler);

		return () => {
			radioWrapper?.removeEventListener('mousedown', clickHandler);
		};
	}, [name, value, selectedValue, setValue, defaultChecked]);

	return (
		<div className={className} ref={radioWrapperRef}>
			<input
				className={css['input']}
				{...register(name)}
				value={value}
				type="radio"
				defaultChecked={defaultChecked}
				{...rest}
			/>
			{children}
		</div>
	);
};
