import css from './measure.module.scss';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SkipStep } from 'features/steps';
import { BtnWithProgress, Loader, MeasureStatus } from 'shared/ui/components';
import cn from 'classnames';

interface MeasureProps<T = unknown> {
	action: () => Promise<T>;
	onSuccess?: () => void;
	onError?: () => void;
	nextStep: string;
	delayTime?: number;
}

export const Measure = ({ action, onSuccess, onError, nextStep, delayTime = 5000 }: MeasureProps) => {
	const [isRunning, setIsRunning] = useState(false);
	const [isActionProcess, setIsActionProcess] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [isBtnClose, setIsBtnClose] = useState(false);
	const [isFinish, setIsFinish] = useState(false);
	const [delayCount, setDelayCount] = useState(0);
	const navigate = useNavigate();

	const countStep = 10;

	useEffect(() => {
		if (!isRunning || delayCount < delayTime || isActionProcess) return;

		setIsActionProcess(true);

		action()
			.then(() => {
				setIsComplete(true);

				if (onSuccess) onSuccess();
			})
			.catch(() => {
				if (onError) onError();
			})
			.finally(() => {
				setIsRunning(false);
				setIsActionProcess(false);
				setDelayCount(0);

				setTimeout(() => {
					setIsBtnClose(false);
				}, 500);
			});
	}, [delayCount, action, onError, onSuccess, isRunning, isActionProcess, delayTime]);

	useEffect(() => {
		if (!isRunning) return;

		const interval = setInterval(() => {
			setDelayCount((prev) => {
				const newDelayCount = prev + countStep;

				if (newDelayCount >= delayTime - 500) {
					setIsBtnClose(true);
				}

				return prev + countStep;
			});
		}, countStep);

		return () => clearInterval(interval);
	}, [delayTime, isRunning]);

	useEffect(() => {
		if (!isComplete) return;

		setDelayCount(0);

		const interval = setInterval(() => {
			setDelayCount((prev) => {
				const newDelayCount = prev + countStep;

				if (newDelayCount >= delayTime) {
					setIsFinish(true);
				}

				return prev + countStep;
			});
		}, countStep);

		return () => clearInterval(interval);
	}, [delayTime, isComplete, navigate, nextStep]);

	const clickHandler = () => {
		if (isRunning) return;

		if (isComplete) {
			navigate(nextStep);
			return;
		}

		setIsRunning(true);
		setIsComplete(false);
	};

	if (isFinish) {
		return <Navigate to={nextStep} />;
	}

	const btnText = isRunning ? 'Приготовьтесь' : isComplete ? 'Следующий шаг' : 'Измерить';
	const btnCloseClass = isBtnClose ? 'close' : '';
	const completeClass = isComplete ? 'complete' : '';
	const runningClass = isRunning ? 'running' : '';

	return (
		<>
			<MeasureStatus isComplete={isComplete} />
			<div className={css['main']}>
				<BtnWithProgress
					className={cn(css['btn'], completeClass, runningClass, btnCloseClass)}
					text={btnText}
					onClick={clickHandler}
					curValue={delayCount}
					totalValue={delayTime}
				/>
				<Loader text="Измеряем..." isLoading={isActionProcess} />
				{!isRunning && !isActionProcess && !isComplete && <SkipStep nextStep={nextStep} />}
			</div>
		</>
	);
};
