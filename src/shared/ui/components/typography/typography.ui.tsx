import { PropsWithChildren } from 'react';
import css from './typography.module.scss';

export const Typography = ({ children }: PropsWithChildren) => {
	return <div className={css['typography']}>{children}</div>;
};
