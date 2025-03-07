import css from './main-value.module.scss';
import { PulsCircle } from '../puls-circle';
import cn from 'classnames';
import { HTMLAttributes } from 'react';

interface MainValueProps extends HTMLAttributes<HTMLDivElement> {
	title?: string;
	valueTitle?: string;
	color?: string;
	status?: string;
	value?: string;
}

export const MainValue = ({ title, color, status, value, valueTitle, className }: MainValueProps) => {
	return (
		<div className={cn(css['main'], title ? 'has-title' : '', className)}>
			{title && <h5 className={cn(css['title'], !color ? 'single' : '')}>{title}</h5>}
			{color && (
				<div className={css['value']}>
					<PulsCircle
						color={color}
						diameter={150}
						fontSize={20}
						status={status}
						value={value}
						title={valueTitle}
					/>
				</div>
			)}
		</div>
	);
};
