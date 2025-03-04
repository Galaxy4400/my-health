import css from './icon-item.module.scss';
import { PropsWithChildren } from 'react';
import { Icons } from 'shared/types';
import { Icon } from 'shared/ui/icons';
import cn from 'classnames';

interface IconItemProps extends PropsWithChildren {
	icon: Icons;
	width?: number;
	height?: number;
	className?: string;
	onClick?: () => void;
}

export const IconItem = ({ icon, width = 36, height = 36, children, className, onClick }: IconItemProps) => {
	return (
		<div className={cn(css['main'], className)} onClick={onClick}>
			<figure className={css['icon']}>
				<Icon name={icon} width={width} height={height} />
			</figure>
			<p className={css['text']}>{children}</p>
		</div>
	);
};
