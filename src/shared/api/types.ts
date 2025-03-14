export type URL = `http${'s' | ''}://${string}`;

export type Methods = 'GET' | 'POST' | 'UPDATE' | 'PATCH' | 'PUT' | 'DELETE';

export interface QueryData {
	[key: string]: string | number | boolean | QueryData | QueryData[];
}

export interface RequestData {
	[key: string]: string | number | boolean | RequestData | RequestData[];
}

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
