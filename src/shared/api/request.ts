import { Methods, QueryData, RequestData } from './types';

const API_BASE_URL = import.meta.env.MODE === 'development' ? import.meta.env.VITE_API_BASE_URL : '';

interface requestProps {
	url?: string;
	method?: Methods;
	data?: RequestData;
	query?: QueryData;
	responseType?: 'json' | 'binary';
}

export const request = async <T>({
	url,
	method = 'GET',
	data = {},
	query = {},
	responseType = 'json',
}: requestProps): Promise<T> => {
	const endpoint = `${API_BASE_URL}/api/${url ? url.replace(/^\/+/, '') : ''}`;

	const queryString = Object.keys(query).length
		? `?${new URLSearchParams(query as Record<string, string>).toString()}`
		: '';

	const controller = new AbortController();
	const timeoutId = setTimeout(() => controller.abort(), 120000);

	try {
		const headers: Record<string, string> = {};

		if (responseType === 'json') {
			headers['Content-Type'] = 'application/json';
		}

		const response = await fetch(endpoint + queryString, {
			method,
			body: method !== 'GET' && Object.keys(data).length ? JSON.stringify(data) : undefined,
			headers,
			signal: controller.signal,
		});

		clearTimeout(timeoutId);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		switch (responseType) {
			case 'json':
				return (await response.json()) as T;
			case 'binary':
				return (await response.blob()) as T;
			default:
				throw new Error(`Unsupported responseType: ${responseType}`);
		}
	} catch (error) {
		if ((error as Error).name === 'AbortError') {
			throw new Error('Request timed out after 120 seconds');
		}
		throw error;
	}
};
