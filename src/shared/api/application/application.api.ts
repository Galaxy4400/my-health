import { request } from '../request';
import { ApplicationResponse } from './application.types';

export const getApplicationDataRequest = (): Promise<ApplicationResponse> => {
	return request({ query: { action: 'settings' } });
};
