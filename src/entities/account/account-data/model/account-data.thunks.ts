import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestData } from 'shared/api';
import { AccountType, createAccount, deleteAccount, editAccount, getAccount } from 'shared/api/account';
import { ErrorType, ID } from 'shared/types';

export const fetchGetAccount = createAsyncThunk<AccountType, ID, { rejectValue: ErrorType }>(
	'account/fetchGetAccount',
	async (id, { rejectWithValue }) => {
		try {
			const { account, error } = await getAccount(id);

			if (!account) {
				throw new Error(error as string);
			}

			return account;
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);

export const fetchCreateAccount = createAsyncThunk<AccountType, RequestData, { rejectValue: ErrorType }>(
	'account/fetchCreateAccount',
	async (submittedData, { rejectWithValue }) => {
		try {
			const { account, error } = await createAccount(submittedData);

			if (!account) {
				throw new Error(error as string);
			}

			return account;
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);

export const fetchDeleteAccount = createAsyncThunk<ID, ID, { rejectValue: ErrorType }>(
	'account/fetchDeleteAccount',
	async (id, { rejectWithValue }) => {
		try {
			const { error } = await deleteAccount(id);

			if (error) {
				throw new Error(error as string);
			}

			return id;
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);

export const fetchEditAccount = createAsyncThunk<
	AccountType,
	{ id: ID; submittedData: RequestData },
	{ rejectValue: ErrorType }
>('account/fetchEditAccount', async ({ id, submittedData }, { rejectWithValue }) => {
	try {
		const { account, error } = await editAccount(id, submittedData);

		if (!account) {
			throw new Error(error as string);
		}

		return account;
	} catch (error: unknown) {
		const knownError = error as ErrorType;

		return rejectWithValue(knownError);
	}
});
