import { ID } from 'shared/types';
import { request } from '../request';
import { RequestData } from '../types';
import { CategoriesResponse, CategoryResponse } from './category.types';

const BASE_URL = 'categories';

export const getCategories = (): Promise<CategoriesResponse> => {
	return request({ url: BASE_URL });
};

export const getCategory = (id: ID): Promise<CategoryResponse> => {
	return request({ url: `${BASE_URL}/${id}` });
};

export const deleteCategory = (id: ID): Promise<CategoryResponse> => {
	return request({ url: `${BASE_URL}/${id}`, method: 'DELETE' });
};

export const createCategory = (submittedData: RequestData): Promise<CategoryResponse> => {
	return request({
		url: BASE_URL,
		method: 'POST',
		data: submittedData,
	});
};

export const editCategory = (id: ID, submittedData: RequestData): Promise<CategoryResponse> => {
	return request<CategoryResponse>({
		url: `${BASE_URL}/${id}`,
		method: 'PATCH',
		data: submittedData,
	});
};
