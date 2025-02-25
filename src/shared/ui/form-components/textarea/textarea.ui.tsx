import { useFormContext } from 'react-hook-form';
import css from './textarea.module.scss';
import { TextareaHTMLAttributes } from 'react';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label?: string;
}

export const Textarea = ({ name, label, ...rest }: TextareaProps) => {
	const { register } = useFormContext();

	if (!name) {
		throw new Error("The 'name' prop is required for Hidden component.");
	}

	return (
		<label className={css['wraper']}>
			{label && <span className={css['label']}>{label}</span>}
			<textarea className={css['input']} {...register(name)} {...rest} />
		</label>
	);
};
