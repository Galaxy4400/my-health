import css from './warning.module.scss';
import { Icon } from 'shared/ui/icons';
import { Icons } from 'shared/types';
import { HTMLAttributes, ReactNode } from 'react';
import cn from 'classnames';

interface WarningProps extends HTMLAttributes<HTMLDivElement> {
	header: ReactNode;
	text: ReactNode;
	noIcon?: boolean;
}

export const Warning = ({ header, text, className, noIcon = false }: WarningProps) => {
	const isString = typeof text === 'string';

	return (
		<div className={cn(css['body'], className)}>
			{!noIcon && (
				<div className={css['icon-column']}>
					<div className={css['icon']}>
						<Icon name={Icons.exclam} width={12} height={44} />
					</div>
				</div>
			)}
			<div className={css['content']}>
				<h3 className={css['title']}>{header}</h3>
				<div
					className={css['text']}
					{...(isString ? { dangerouslySetInnerHTML: { __html: text } } : { children: text })}
				/>
			</div>
		</div>
	);
};
