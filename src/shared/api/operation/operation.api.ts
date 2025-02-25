import { ID } from 'shared/types';
import { request } from '../request';
import { OperationQueryParams, OperationResponse, OperationsResponse } from './operation.types';
import { QueryData, RequestData } from '../types';

const BASE_URL = 'operations';

export const getOperations = (queryData?: QueryData & OperationQueryParams): Promise<OperationsResponse> => {
	return request({ url: BASE_URL, query: queryData });
};

export const getOperationsByAccount = (
	accountId: ID | null,
	queryData?: QueryData,
): Promise<OperationsResponse> => {
	return request<OperationsResponse>({
		url: `${BASE_URL}${accountId ? `/account/${accountId}` : ''}`,
		query: queryData,
	});
};

export const getOperation = (id: ID): Promise<OperationResponse> => {
	return request({ url: `${BASE_URL}/${id}` });
};

export const deleteOperation = (id: ID): Promise<OperationResponse> => {
	return request({ url: `${BASE_URL}/${id}`, method: 'DELETE' });
};

export const createOperation = (submittedData: RequestData): Promise<OperationResponse> => {
	return request({
		url: BASE_URL,
		method: 'POST',
		data: submittedData,
	});
};

export const editOperation = (id: ID, submittedData: RequestData): Promise<OperationResponse> => {
	return request<OperationResponse>({
		url: `${BASE_URL}/${id}`,
		method: 'PATCH',
		data: submittedData,
	});
};
