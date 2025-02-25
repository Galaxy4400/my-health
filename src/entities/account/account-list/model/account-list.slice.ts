import { createSlice } from '@reduxjs/toolkit';
import { AccountListState } from './account-list.types';
import { fetchGetAccountList } from './account-list.thunks';
import { fetchDeleteAccount } from 'entities/account/account-data';

const initialState: AccountListState = {
	accounts: [],
	loading: false,
	error: null,
};

export const accountListSlice = createSlice({
	name: 'accounts',
	initialState,
	reducers: {
		clearAccountListStore: (store) => {
			store.accounts = [];
		},
	},
	extraReducers: (builder) =>
		builder
			// Get account list process
			.addCase(fetchGetAccountList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGetAccountList.fulfilled, (state, { payload }) => {
				state.accounts = payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchGetAccountList.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			})

			// Delete account process
			.addCase(fetchDeleteAccount.fulfilled, (state, { payload }) => {
				state.accounts = state.accounts.filter((account) => account.id !== payload);
			}),
});

export const { clearAccountListStore } = accountListSlice.actions;

export const accountListReducer = accountListSlice.reducer;
