import css from './page-head.module.scss';
import { PropsWithChildren } from 'react';

export const PageHead = ({ children }: PropsWithChildren) => {
	return <div className={css['main']}>{children}</div>;
};
