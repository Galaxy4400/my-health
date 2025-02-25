import { PropsWithChildren } from 'react';
import css from './layout-wrapper.module.scss';

export const LayoutWrapper = ({ children }: PropsWithChildren) => {
	return <div className={css['wrapper']}>{children}</div>;
};
