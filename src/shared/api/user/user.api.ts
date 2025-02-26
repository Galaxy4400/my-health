import { UserResponse } from './user.types';
import { request } from '../request';

export const signIn = (login: string, password: string): Promise<UserResponse> => {
	// return request({
	// 	url: 'login',
	// 	method: 'POST',
	// 	data: { login, password },
	// });
	return Promise.resolve({
		user: {
			id: 1,
			login: 'test',
		},
		error: null,
	});
};

export const signUp = (login: string, password: string): Promise<UserResponse> => {
	// return request({
	// 	url: 'register',
	// 	method: 'POST',
	// 	data: { login, password },
	// });
	return Promise.resolve({
		user: {
			id: 1,
			login: 'test',
		},
		error: null,
	});
};

export const signOut = (): Promise<UserResponse> => {
	// return request({ url: 'logout', method: 'POST' });
	return Promise.resolve({
		user: null,
		error: null,
	});
};

export const signCheck = (): Promise<UserResponse> => {
	// return request({ url: 'me' });
	return Promise.resolve({
		user: null,
		error: 'error',
	});
};
