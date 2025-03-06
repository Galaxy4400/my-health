import css from './value-grid-item.module.scss';
import { PropsWithChildren } from 'react';

interface ValueGridItemProps extends PropsWithChildren {
	title: string;
	row?: number;
	col?: number;
}

export const ValueGridItem = ({ title, children, row, col }: ValueGridItemProps) => {
	return (
		<div className={css['item']} style={{ gridRowStart: row, gridColumnStart: col }}>
			<h5 className={css['title']}>{title}</h5>
			<div className={css['block']}>{children}</div>
		</div>
	);
};
