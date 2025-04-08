import { PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { IdleContext } from './idle.context';
import { path } from 'shared/lib/router';
import { IdlePopup } from './idle.ui';
import { useModal } from '../modal';

interface IdleProviderProps extends PropsWithChildren {
	seconds?: number;
}

const SEC_LEFT_SHOW_POPUP = 10;

export const IdleProvider = ({ seconds = 30, children }: IdleProviderProps) => {
	const navigate = useNavigate();
	const [idleTimer, setIdleTimer] = useState(12);
	const [showPopup, setShowPopup] = useState(false);
	const { closeModal } = useModal();
	const location = useLocation();

	const resetTimer = useCallback(() => {
		setIdleTimer(seconds);
	}, [seconds]);

	useEffect(() => {
		const interval = setInterval(() => {
			setIdleTimer((prev) => prev - 1);
		}, 1000);

		const events = ['keydown', 'scroll', 'touchstart', 'click'];
		events.forEach((event) => window.addEventListener(event, resetTimer));

		return () => {
			clearInterval(interval);
			events.forEach((event) => window.removeEventListener(event, resetTimer));
		};
	}, [navigate, resetTimer, seconds]);

	useEffect(() => {
		if (idleTimer <= SEC_LEFT_SHOW_POPUP) {
			setShowPopup(true);
		} else {
			setShowPopup(false);
		}

		if (idleTimer <= 0) {
			resetTimer();
			closeModal();
			// navigate(path.home());
		}
	}, [idleTimer, resetTimer, navigate, closeModal]);

	return (
		<IdleContext.Provider value={{ resetIdleTimer: resetTimer }}>
			{children}
			{showPopup && location.pathname !== path.home() && (
				<IdlePopup totalSeconds={SEC_LEFT_SHOW_POPUP} onClick={resetTimer} />
			)}
		</IdleContext.Provider>
	);
};
