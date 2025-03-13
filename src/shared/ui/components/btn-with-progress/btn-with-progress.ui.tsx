import css from './btn-with-progress.module.scss';
import { HTMLAttributes } from 'react';
import cn from 'classnames';
import { toPercentage } from 'shared/utils';
import { CircleProgress } from '../circle-progress';

interface BtnWithProgressProps extends HTMLAttributes<HTMLButtonElement> {
	text: string;
	onClick: () => void;
	curValue: number;
	totalValue: number;
}

export const BtnWithProgress = ({ text, onClick, curValue, totalValue, className }: BtnWithProgressProps) => {
	return (
		<button className={cn(css['btn'], className)} onClick={onClick}>
			<CircleProgress className={css['progress']} value={toPercentage(curValue, totalValue)} size={230} />
			<span className={css['text']}>{text}</span>
		</button>
	);
};
