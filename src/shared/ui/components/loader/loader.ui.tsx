import css from './loader.module.scss';
import { HTMLAttributes } from 'react';
import { Icon } from 'shared/ui/icons';
import { Icons } from 'shared/types';
import cn from 'classnames';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
	text: string;
	isLoading?: boolean;
}

export const Loader = ({ text, isLoading = false, className }: LoaderProps) => {
	return (
		<div className={cn(css['loader'], className, isLoading ? 'process' : '')}>
			<div className={cn(css['icon-wrapper'], isLoading ? 'process' : '')}>
				<Icon className={cn(css['icon'], isLoading ? 'process' : '')} name={Icons.load} />
				<span className={css['process']}>{text}</span>
			</div>
		</div>
	);
};
