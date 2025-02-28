import css from './measure-btn.module.scss';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { Icons } from 'shared/types';
import { Icon } from 'shared/ui/icons';
import cn from 'classnames';

interface MesureBtnProps {
	startCount?: number;
	action?: () => void;
}

export const MesureBtn = ({ action, startCount = 5 }: MesureBtnProps) => {
	const [isRunning, setIsRunning] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [count, setCount] = useState(startCount);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			setCount((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					setIsComplete(true);
					setIsRunning(false);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning]);

	const clickHandler = () => {
		if (isComplete) {
			navigate(path.start());
			return;
		}
		setIsRunning(true);
		setIsComplete(false);
		setCount(startCount);
	};

	return (
		<div className={css['main']}>
			<button className={cn(css['btn'], isComplete ? 'complete' : '')} onClick={clickHandler}>
				{isComplete ? 'Следующий шаг' : 'Измерить'}
			</button>
			<div className={cn(css['loader'], isRunning ? 'active' : '')}>
				<div className={css['icon-wrapper']}>
					<Icon className={cn(css['icon'], isRunning ? 'active' : '')} name={Icons.load} />
					<span className={css['counter']}>{count}</span>
				</div>
			</div>
		</div>
	);
};
