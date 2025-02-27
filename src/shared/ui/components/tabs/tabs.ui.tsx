import css from './tabs.module.scss';
import cn from 'classnames';
import { useState } from 'react';
import { TabsContext } from './tabs.context';
import { TabsProps } from './tabs.types';

export const Tabs = ({ active = null, children, className }: TabsProps) => {
	const [openIndex, setOpenIndex] = useState<number | null>(active);

	const toggle = (index: number) => {
		setOpenIndex(index);
	};

	return (
		<TabsContext.Provider value={{ toggle, openIndex }}>
			<div className={cn(css['spoiler'], className)}>{children}</div>
		</TabsContext.Provider>
	);
};
