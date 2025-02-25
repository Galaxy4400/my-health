import { createAsyncThunk } from '@reduxjs/toolkit';
import { AccountType, getAccounts } from 'shared/api/account';
import { ErrorType } from 'shared/types';

export const fetchGetAccountList = createAsyncThunk<AccountType[], void, { rejectValue: ErrorType }>(
	'account/fetchGetAccountList',
	async (_, { rejectWithValue }) => {
		try {
			const { accounts, error } = await getAccounts();

			if (!accounts) {
				throw new Error(error as string);
			}

			return accounts;
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);
