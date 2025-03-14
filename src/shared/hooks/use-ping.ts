import { useEffect, useState } from 'react';
import { request, ResponseType } from 'shared/api';

const delay = 5000;

export const usePing = () => {
	const [isError, setIsError] = useState(false);

	useEffect(() => {
		// const ping = () =>
		// 	request<ResponseType>({ query: { action: 'ping' } }).then((response) => {
		// 		if (response.status !== 'ok') {
		// 			setIsError(true);
		// 		} else {
		// 			setIsError(false);
		// 		}
		// 	});
		// const interval = setInterval(ping, delay);
		// return () => clearInterval(interval);
	}, []);

	return { isError };
};
