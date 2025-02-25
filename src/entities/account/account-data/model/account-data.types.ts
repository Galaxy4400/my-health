import { AccountType } from 'shared/api/account';

export interface AccountDataState {
	account: AccountType;
	loading: boolean;
	creating: boolean;
	deleting: boolean;
	updating: boolean;
	error: string | null;
}
