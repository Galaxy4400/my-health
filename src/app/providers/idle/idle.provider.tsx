import { PropsWithChildren, useCallback, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { IdleContext } from './idle.context';
import { path } from 'shared/lib/router';

interface IdleProviderProps extends PropsWithChildren {
	seconds?: number;
}

export const IdleProvider = ({ seconds = 30, children }: IdleProviderProps) => {
	const navigate = useNavigate();
	const idleTimeRef = useRef(0);

	const resetTimer = useCallback(() => {
		idleTimeRef.current = 0;
	}, []);

	useEffect(() => {
		const interval = setInterval(() => {
			idleTimeRef.current++;

			if (idleTimeRef.current > seconds) {
				resetTimer();
				navigate(path.home());
			}
		}, 1000);

		const events = ['mousemove', 'keydown', 'scroll', 'touchstart'];
		events.forEach((event) => window.addEventListener(event, resetTimer));

		return () => {
			clearInterval(interval);
			events.forEach((event) => window.removeEventListener(event, resetTimer));
		};
	}, [navigate, resetTimer, seconds]);

	return <IdleContext.Provider value={{ resetIdleTimer: resetTimer }}>{children}</IdleContext.Provider>;
};
