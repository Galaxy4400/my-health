export type URL = `http${'s' | ''}://${string}`;

export type Methods = 'GET' | 'POST' | 'UPDATE' | 'PATCH' | 'PUT' | 'DELETE';

export type QueryData = Record<string, string | number | boolean>;

export type RequestData = Record<string, string | number | boolean>;

export interface ResponseType {
	status: string;
	meta: Record<string, string>;
}

export interface PagingData<T> {
	items: T[];
	total: number;
	page: number;
	limit: number;
	totalPages: number;
}
