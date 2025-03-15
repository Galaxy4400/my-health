import css from './warning-popup.module.scss';
import { HTMLAttributes, ReactNode } from 'react';
import { Button } from '../button';
import { Warning } from '../warning';
import cn from 'classnames';

interface WarningProps extends HTMLAttributes<HTMLDivElement> {
	header: ReactNode;
	text?: ReactNode;
	onOk?: () => void;
	noIcon?: boolean;
}

export const WarningPopup = ({ header, text, className, onOk, noIcon = false }: WarningProps) => {
	return (
		<div className={cn(css['main'], className)}>
			<Warning header={header} text={text} noIcon={noIcon} />
			<Button className={css['btn']} onClick={onOk}>
				ОК
			</Button>
		</div>
	);
};
