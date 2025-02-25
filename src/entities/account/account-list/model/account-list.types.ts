import { AccountType } from 'shared/api/account';

export interface AccountListState {
	accounts: AccountType[];
	loading: boolean;
	error: string | null;
}
