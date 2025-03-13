import { request } from '../request';
import { ApplicationResponse } from './application.types';

export const getApplication = (): Promise<ApplicationResponse> => {
	return request({ query: { action: 'settings' } });
};
