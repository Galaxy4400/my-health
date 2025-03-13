import { useEffect } from 'react';
import { request } from 'shared/api';

const delay = 30000;

export const usePing = () => {
	useEffect(() => {
		const ping = () => request({ query: { action: 'ping' } }).then(console.log);

		const interval = setInterval(ping, delay);

		return () => clearInterval(interval);
	}, []);
};
