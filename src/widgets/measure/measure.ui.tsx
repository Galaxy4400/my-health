import css from './measure.module.scss';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SkipStep } from 'features/steps';
import { Loader, MeasureStatus } from 'shared/ui/components';
import cn from 'classnames';

interface MeasureProps<T = unknown> {
	startCount?: number;
	action: () => Promise<T>;
	onSuccess?: () => void;
	onError?: () => void;
	nextStep: string;
}

export const Measure = ({ action, onSuccess, onError, nextStep, startCount = 5 }: MeasureProps) => {
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
				if (prev <= 2) setTimeout(() => setIsBtnClose(true), 500);
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

	return (
		<>
			<MeasureStatus isComplete={isComplete} />
			<div className={css['main']}>
				<button className={cn(css['btn'], completeClass, activeClass, btnCloseClass)} onClick={clickHandler}>
					{btnText}
				</button>
				<Loader text="Измеряем..." isLoading={isActionProcess} />
				{!isRunning && !isActionProcess && !isComplete && <SkipStep nextStep={nextStep} />}
			</div>
		</>
	);
};
