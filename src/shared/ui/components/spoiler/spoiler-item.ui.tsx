import css from './spoiler-item.module.scss';
import { useSpoiler } from './spoiler.use';
import cn from 'classnames';
import { SpoilerItemProps } from './spoiler.types';

export const SpoilerItem = ({ title, index, element, children }: SpoilerItemProps) => {
	const { toggle, openIndex } = useSpoiler();

	const activeClass = openIndex === index ? 'active' : '';

	return (
		<div className={cn(css['main'], activeClass)}>
			<button className={cn(css['button'], activeClass)} onClick={() => toggle(index)}>
				{title}
			</button>
			<div className={cn(css['content'], activeClass)}>{element || children}</div>
		</div>
	);
};
