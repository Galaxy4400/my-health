import css from './tabs-container.module.scss';
import { useTabs } from './tabs.use';
import cn from 'classnames';
import { TabsContainerProps } from './tabs.types';

export const TabsContainer = ({ index, element, className, children }: TabsContainerProps) => {
	const { openIndex } = useTabs();

	const activeClass = openIndex === index ? 'active' : '';

	return (
		<div className={cn(css['main'], activeClass, className)}>
			<div className={cn(css['content'], activeClass)}>{element || children}</div>
		</div>
	);
};
