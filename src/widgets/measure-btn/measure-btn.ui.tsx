import css from './measure-btn.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icons } from 'shared/types';
import { Icon } from 'shared/ui/icons';
import cn from 'classnames';

interface MeasureBtnProps<T = unknown> {
	startCount?: number;
	action: () => Promise<T>;
	onSuccess?: () => void;
	onError?: () => void;
	nextStep: string;
}

export const MeasureBtn = ({ action, onSuccess, onError, nextStep, startCount = 5 }: MeasureBtnProps) => {
	const [isRunning, setIsRunning] = useState(false);
	const [isActionProcess, setIsActionProcess] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [count, setCount] = useState(startCount);
	const navigate = useNavigate();

	useEffect(() => {
		if (count > 0) return;

		setIsActionProcess(true);

		action()
			.then(() => {
				if (onSuccess) onSuccess();
			})
			.catch(() => {
				if (onError) onError();
			})
			.finally(() => {
				setIsComplete(true);
				setIsRunning(false);
				setIsActionProcess(false);
			});
	}, [count, action, onError, onSuccess]);

	useEffect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			setCount((prev) => {
				if (prev <= 1) {
					clearInterval(interval);
					return 0;
				}
				return prev - 1;
			});
		}, 1000);

		return () => clearInterval(interval);
	}, [isRunning]);

	const clickHandler = () => {
		if (isComplete) {
			navigate(nextStep);
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
				<div className={cn(css['icon-wrapper'], isRunning ? 'active' : '')}>
					<Icon className={cn(css['icon'], isRunning ? 'active' : '')} name={Icons.load} />
					{isActionProcess ? (
						<span className={css['processs']}>Измеряем...</span>
					) : (
						<span className={css['counter']}>{count}</span>
					)}
				</div>
			</div>
		</div>
	);
};
