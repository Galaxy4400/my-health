import css from './value-list.module.scss';
import { PropsWithChildren } from 'react';

export const ValueList = ({ children }: PropsWithChildren) => {
	return <div className={css['list']}>{children}</div>;
};
