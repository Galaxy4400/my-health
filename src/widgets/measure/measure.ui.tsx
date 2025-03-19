import css from './measure.module.scss';
import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { SkipStep } from 'features/steps';
import { BtnWithProgress, Loader, MeasureStatus } from 'shared/ui/components';
import cn from 'classnames';
import { patientMeasureStatusRequest } from 'shared/api/patient';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from 'entities/patient/patient-data';

interface MeasureProps<T = unknown> {
	action: () => Promise<T>;
	onSuccess?: () => void;
	onError?: () => void;
	nextStep: string;
	delayTime?: number;
}

export const Measure = ({ action, onSuccess, onError, nextStep, delayTime = 5000 }: MeasureProps) => {
	const patient = useAppSelector(selectPatientData);
	const [isRunning, setIsRunning] = useState(false);
	const [isActionProcess, setIsActionProcess] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const [isBtnClose, setIsBtnClose] = useState(false);
	const [isFinish, setIsFinish] = useState(false);
	const [delayCount, setDelayCount] = useState(0);
	const [processStatus, setProcessStatus] = useState<string | null>(null);
	const navigate = useNavigate();

	const countStep = 10;

	useEffect(() => {
		if (!isRunning || !isActionProcess) return;

		const getProgress = () =>
			patientMeasureStatusRequest(patient.visit_id).then((response) => setProcessStatus(response.content));

		const interval = setInterval(() => {
			getProgress();
		}, 2000);

		getProgress();

		return () => clearInterval(interval);
	}, [isRunning, isActionProcess, patient.visit_id]);

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
			<div className={cn(css['process'], isRunning ? 'active' : '')}>
				<Loader className={css['loader']} text="Измеряем..." isLoading={isActionProcess} />
				<BtnWithProgress
					className={cn(css['btn-process'], completeClass, runningClass, btnCloseClass)}
					text={btnText}
					onClick={clickHandler}
					curValue={delayCount}
					totalValue={delayTime}
				/>
				{processStatus && <div dangerouslySetInnerHTML={{ __html: processStatus }} />}
			</div>
			<div className={css['main']}>
				<BtnWithProgress
					className={cn(css['btn'], completeClass, runningClass, btnCloseClass)}
					text={btnText}
					onClick={clickHandler}
					curValue={delayCount}
					totalValue={delayTime}
				/>
				{!isRunning && !isActionProcess && !isComplete && <SkipStep nextStep={nextStep} />}
			</div>
		</>
	);
};
