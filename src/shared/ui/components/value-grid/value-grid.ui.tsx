import css from './value-grid.module.scss';
import { PropsWithChildren } from 'react';

export const ValueGrid = ({ children }: PropsWithChildren) => {
	return <div className={css['grid']}>{children}</div>;
};
