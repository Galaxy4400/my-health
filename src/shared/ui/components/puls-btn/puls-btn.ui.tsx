import css from './puls-btn.module.scss';
import { HTMLAttributes, PropsWithChildren } from 'react';
import cn from 'classnames';

interface PulsBtnProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
	onClick: () => void;
}

export const PulsBtn = ({ onClick, children, className }: PulsBtnProps) => {
	return (
		<button className={cn(css['btn'], className)} onClick={onClick}>
			{children}
		</button>
	);
};
