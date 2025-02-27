import css from './tabs-button.module.scss';
import { TabsItemProps } from './tabs.types';
import { useTabs } from './tabs.use';
import cn from 'classnames';

export const TabsButton = ({ index, element, children, className }: TabsItemProps) => {
	const { toggle, openIndex } = useTabs();

	const activeClass = openIndex === index ? 'active' : '';

	return (
		<div className={cn(css['button'], activeClass, className)} onClick={() => toggle(index)}>
			{element || children}
		</div>
	);
};
