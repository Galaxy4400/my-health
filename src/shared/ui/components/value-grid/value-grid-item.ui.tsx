import css from './value-grid-item.module.scss';
import { PropsWithChildren } from 'react';
import cn from 'classnames';

interface ValueGridItemProps extends PropsWithChildren {
	index: number;
	title: string;
	row?: number;
	col?: number;
}

export const ValueGridItem = ({ index, title, children, row, col }: ValueGridItemProps) => {
	return (
		<div
			className={cn(css['item'], css[`item_${index}`])}
			style={{ gridRowStart: row, gridColumnStart: col }}
		>
			<h5 className={css['title']}>{title}</h5>
			<div className={css['block']}>{children}</div>
		</div>
	);
};
