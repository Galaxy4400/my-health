import { CSSProperties, HTMLAttributes } from 'react';
import css from './grid.module.scss';
import cn from 'classnames';

interface GridProps extends HTMLAttributes<HTMLDivElement> {
	columns?: number;
	gap?: number;
}

export const Grid = ({ className, columns = 1, gap = 0, children }: GridProps) => {
	return (
		<div
			className={cn(css['grid'], className)}
			style={{ '--columns': columns, '--gap': gap } as CSSProperties}
		>
			{children}
		</div>
	);
};
