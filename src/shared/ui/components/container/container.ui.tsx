import { HTMLAttributes } from 'react';
import css from './container.module.scss';
import cn from 'classnames';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
	width?: `${number}` | number;
}

export const Container = ({ className, children, width }: ContainerProps) => {
	return (
		<div className={cn(css['container'], className)} style={width ? { maxWidth: `${width}px` } : {}}>
			{children}
		</div>
	);
};
