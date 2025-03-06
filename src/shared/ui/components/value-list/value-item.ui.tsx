import { PropsWithChildren } from 'react';
import css from './value-item.module.scss';

interface ValueItemProps extends PropsWithChildren {
	title: string;
}

export const ValueItem = ({ title, children }: ValueItemProps) => {
	return (
		<div className={css['item']}>
			<h5 className={css['title']}>{title}</h5>
			{children}
		</div>
	);
};
