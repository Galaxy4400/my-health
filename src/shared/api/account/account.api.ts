import { ID } from 'shared/types';
import { request } from '../request';
import { RequestData } from '../types';
import { AccountResponse, AccountsResponse } from './account.types';

const BASE_URL = 'accounts';

export const getAccounts = (): Promise<AccountsResponse> => {
	return request({ url: `${BASE_URL}` });
};

export const getAccount = (id: ID): Promise<AccountResponse> => {
	return request({ url: `${BASE_URL}/${id}` });
};

export const deleteAccount = (id: ID): Promise<AccountResponse> => {
	return request({ url: `${BASE_URL}/${id}`, method: 'DELETE' });
};

export const createAccount = (submittedData: RequestData): Promise<AccountResponse> => {
	return request({
		url: BASE_URL,
		method: 'POST',
		data: submittedData,
	});
};

export const editAccount = (id: ID, submittedData: RequestData): Promise<AccountResponse> => {
	return request({
		url: `${BASE_URL}/${id}`,
		method: 'PATCH',
		data: submittedData,
	});
};
