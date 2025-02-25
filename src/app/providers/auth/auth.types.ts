/* eslint-disable no-unused-vars */
import { UserResponse, UserType } from 'shared/api/user';

export interface AuthContextType {
	authorize: (login: string, password: string) => Promise<UserResponse>;
	registration: (login: string, password: string) => Promise<UserResponse>;
	logout: () => void;
	authCheck: () => void;
	authUser: UserType | null;
}
