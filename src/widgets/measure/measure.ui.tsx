/* eslint-disable no-unused-vars */
import css from './measure.module.scss';
import { useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SkipStep } from 'features/steps';
import { BtnWithProgress, Loader, MeasureStatus } from 'shared/ui/components';
import { MeasureProcessStatus, patientMeasureStatusRequest } from 'shared/api/patient';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from 'entities/patient/patient-data';
import { ProcessStatus } from './process-status.ui';
import cn from 'classnames';

interface MeasureProps<T = unknown> {
	action?: () => Promise<T>;
	override?: (isComplete: boolean, reboot?: () => void, next?: () => void) => React.ReactNode;
	onSuccess?: () => void;
	onError?: () => void;
	nextStep: string;
	delayTime?: number;
	nextDelayTime?: number;
}

export const Measure = ({
	action,
	override,
	onSuccess,
	onError,
	nextStep,
	delayTime = 5000,
	nextDelayTime = 5000,
}: MeasureProps) => {
	const patient = useAppSelector(selectPatientData);
	const [isRunning, setIsRunning] = useState(false);
	const [isActionProcess, setIsActionProcess] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [isBtnClose, setIsBtnClose] = useState(false);
	const [isFinish, setIsFinish] = useState(false);
	const [delayCount, setDelayCount] = useState(0);
	const [processStatus, setProcessStatus] = useState<MeasureProcessStatus | null>(null);
	const delayIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const navigate = useNavigate();

	const countStep = 10;

	useEffect(() => {
		if (!isRunning || !isActionProcess) return;

		const getProgress = () =>
			patientMeasureStatusRequest(patient.visit_id).then((response) => setProcessStatus(response));

		const interval = setInterval(() => {
			getProgress();
		}, 2000);

		getProgress();

		return () => clearInterval(interval);
	}, [isRunning, isActionProcess, patient.visit_id]);

	useEffect(() => {
		if (!isRunning || delayCount < delayTime || isActionProcess) return;

		setIsActionProcess(true);

		action?.()
			.then(() => {
				setIsComplete(true);
				setProcessStatus(null);

				if (onSuccess) onSuccess();
			})
			.catch(() => {
				if (onError) onError();
			})
			.finally(() => {
				setIsRunning(false);
				setIsActionProcess(false);
				setProcessStatus(null);
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

		delayIntervalRef.current = setInterval(() => {
			setDelayCount((prev) => {
				const newDelayCount = prev + countStep;

				if (newDelayCount >= nextDelayTime) {
					setIsFinish(true);
				}

				return prev + countStep;
			});
		}, countStep);

		return () => clearInterval(delayIntervalRef.current as unknown as number);
	}, [nextDelayTime, isComplete, navigate, nextStep]);

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
			{action && <MeasureStatus isComplete={isComplete} />}
			<div className={cn(css['process'], isRunning ? 'active' : '')}>
				<BtnWithProgress
					className={cn(css['btn-process'], completeClass, runningClass, btnCloseClass)}
					text={btnText}
					onClick={clickHandler}
					curValue={delayCount}
					totalValue={delayTime}
				/>
				{processStatus && <ProcessStatus statusData={processStatus} />}
			</div>
			<div className={css['main']}>
				{action && (
					<BtnWithProgress
						className={cn(css['btn'], completeClass, runningClass, btnCloseClass)}
						text={btnText}
						onClick={clickHandler}
						curValue={delayCount}
						totalValue={isComplete ? nextDelayTime : delayTime}
					/>
				)}
				{!isRunning &&
					!isActionProcess &&
					override &&
					override(
						isComplete,
						() => {
							setDelayCount(0);
							setIsComplete(false);
							clearInterval(delayIntervalRef.current as unknown as number);
						},
						() => navigate(nextStep),
					)}
				{!isRunning && !isActionProcess && !isComplete && <SkipStep nextStep={nextStep} />}
			</div>
		</>
	);
};
