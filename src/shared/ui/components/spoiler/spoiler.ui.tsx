import css from './spoiler.module.scss';
import cn from 'classnames';
import { HTMLAttributes, PropsWithChildren, useState } from 'react';
import { SpoilerContext } from './spoiler.context';

interface SpoilerProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
	active?: number | null;
}

export const Spoiler = ({ active = null, children, className }: SpoilerProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(active);

	const toggle = (index: number) => {
		setOpenIndex(index);
	};

	return (
		<SpoilerContext.Provider value={{ toggle, openIndex }}>
			<div className={cn(css['spoiler'], className)}>{children}</div>
		</SpoilerContext.Provider>
	);
};
