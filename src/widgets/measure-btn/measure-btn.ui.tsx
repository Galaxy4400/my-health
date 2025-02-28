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
	const [isBtnClose, setIsBtnClose] = useState(false);
	const [count, setCount] = useState(startCount);
	const navigate = useNavigate();

	useEffect(() => {
		if (!isRunning || count > 0 || isActionProcess) return;

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

				setTimeout(() => {
					setIsBtnClose(false);
				}, 500);
			});
	}, [count, action, onError, onSuccess, isRunning, isActionProcess]);

	useEffect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			setCount((prev) => {
				if (prev <= 2) {
					setTimeout(() => {
						setIsBtnClose(true);
					}, 500);
				}
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
		if (isRunning) return;

		if (isComplete) {
			navigate(nextStep);
			return;
		}
		setIsRunning(true);
		setIsComplete(false);
		setCount(startCount);
	};

	const btnText = isRunning ? count : isComplete ? 'Следующий шаг' : 'Измерить';
	const btnCloseClass = isBtnClose ? 'close' : '';
	const completeClass = isComplete ? 'complete' : '';
	const activeClass = isRunning ? 'active' : '';
	const processClass = isActionProcess ? 'process' : '';

	return (
		<div className={css['main']}>
			<button className={cn(css['btn'], completeClass, activeClass, btnCloseClass)} onClick={clickHandler}>
				{btnText}
			</button>
			<div className={cn(css['loader'], processClass)}>
				<div className={cn(css['icon-wrapper'], processClass)}>
					<Icon className={cn(css['icon'], processClass)} name={Icons.load} />
					<span className={css['process']}>Измеряем...</span>
				</div>
			</div>
		</div>
	);
};
