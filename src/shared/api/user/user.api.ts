import { UserResponse } from './user.types';
import { request } from '../request';

export const signIn = (login: string, password: string): Promise<UserResponse> => {
	return request({
		url: 'login',
		method: 'POST',
		data: { login, password },
	});
};

export const signUp = (login: string, password: string): Promise<UserResponse> => {
	return request({
		url: 'register',
		method: 'POST',
		data: { login, password },
	});
};

export const signOut = (): Promise<UserResponse> => {
	return request({ url: 'logout', method: 'POST' });
};

export const signCheck = (): Promise<UserResponse> => {
	return request({ url: 'me' });
};
