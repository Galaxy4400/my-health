import { HTMLAttributes } from 'react';
import css from './title-block.module.scss';
import cn from 'classnames';

interface TitleBlockProps extends HTMLAttributes<HTMLDivElement> {
	title?: string;
	label?: string;
}

export const TitleBlock = ({ title, label, className }: TitleBlockProps) => {
	return (
		<div className={cn(css['main'], className)}>
			{title && <h2 className={css['title']}>{title}</h2>}
			{label && <p className={css['label']}>{label}</p>}
		</div>
	);
};
