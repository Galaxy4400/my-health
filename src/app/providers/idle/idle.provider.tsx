import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdleContext } from './idle.context';
import { path } from 'shared/lib/router';
import { IdlePopup } from './idle.ui';

interface IdleProviderProps extends PropsWithChildren {
	seconds?: number;
}

const SEC_LEFT_SHOW_POPUP = 10;

export const IdleProvider = ({ seconds = 30, children }: IdleProviderProps) => {
	const navigate = useNavigate();
	const [idleTimer, setIdleTimer] = useState(seconds);
	const [showPopup, setShowPopup] = useState(false);

	const resetTimer = useCallback(() => {
		setIdleTimer(seconds);
	}, [seconds]);

	useEffect(() => {
		const interval = setInterval(() => {
			setIdleTimer((prev) => prev - 1);
		}, 1000);

		const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
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
			navigate(path.home());
		}
	}, [idleTimer, resetTimer, navigate]);

	return (
		<IdleContext.Provider value={{ resetIdleTimer: resetTimer }}>
			{children}
			{showPopup && <IdlePopup secLeft={idleTimer} totalSeconds={SEC_LEFT_SHOW_POPUP} />}
		</IdleContext.Provider>
	);
};
