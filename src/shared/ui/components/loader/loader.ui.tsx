import { HTMLAttributes } from 'react';
import css from './loader.module.scss';
import cn from 'classnames';

interface LoaderProps extends HTMLAttributes<HTMLDivElement> {
	isLoading?: boolean;
}

export const Loader = ({ isLoading = false, children, ...rest }: LoaderProps) => {
	return (
		<div className={css['container']} {...rest}>
			{children}
			<div className={cn(css['loader'], isLoading ? css['active'] : '')}>
				<span>Loading...</span>
			</div>
		</div>
	);
};
