import { HTMLAttributes, ReactNode } from 'react';
import css from './title-block.module.scss';
import cn from 'classnames';

interface TitleBlockProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
	title?: ReactNode;
	label?: ReactNode;
}

export const TitleBlock = ({ title, label, className }: TitleBlockProps) => {
	return (
		<div className={cn(css['main'], className)}>
			{title && <h2 className={css['title']}>{title}</h2>}
			{label && <div className={css['label']}>{label}</div>}
		</div>
	);
};
