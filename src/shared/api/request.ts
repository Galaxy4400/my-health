import { Methods, QueryData, RequestData } from './types';

const API_BASE_URL = import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_BASE_URL : '';

interface requestProps {
	url?: string;
	method?: Methods;
	data?: RequestData;
	query?: QueryData;
}

export const request = async <T>({
	url,
	method = 'GET',
	data = {},
	query = {},
}: requestProps): Promise<T> => {
	const endpoint = `${API_BASE_URL}/api/${url ? url.replace(/^\/+/, '') : ''}`;

	const queryString = Object.keys(query).length
		? `?${new URLSearchParams(query as Record<string, string>).toString()}`
		: '';

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 120000);

	try {
		const response = await fetch(endpoint + queryString, {
			method,
			body: method !== 'GET' && Object.keys(data).length ? JSON.stringify(data) : undefined,
			headers: {
				'Content-Type': 'application/json',
			},
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		return (await response.json()) as T;
	} catch (error) {
		if ((error as Error).name === 'AbortError') {
			throw new Error('Request timed out after 120 seconds');
		}
		throw error;
	}
};
