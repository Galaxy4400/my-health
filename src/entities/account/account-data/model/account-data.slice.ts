import { createSlice } from '@reduxjs/toolkit';
import { AccountDataState } from './account-data.types';
import {
	fetchCreateAccount,
	fetchDeleteAccount,
	fetchEditAccount,
	fetchGetAccount,
} from './account-data.thunks';

const initialState: AccountDataState = {
	account: {
		id: '',
		type: '',
		name: '',
		createdAt: '',
		amount: 0,
		comment: '',
	},
	loading: false,
	creating: false,
	deleting: false,
	updating: false,
	error: null,
};

export const accountDataSlice = createSlice({
	name: 'account',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			// Get account process
			.addCase(fetchGetAccount.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGetAccount.fulfilled, (state, { payload }) => {
				state.account = payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchGetAccount.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			})

			// Create account process
			.addCase(fetchCreateAccount.pending, (state) => {
				state.creating = true;
				state.error = null;
			})
			.addCase(fetchCreateAccount.fulfilled, (state, { payload }) => {
				state.account = payload;
				state.creating = false;
				state.error = null;
			})
			.addCase(fetchCreateAccount.rejected, (state, { payload }) => {
				state.creating = false;
				state.error = payload?.message ?? null;
			})

			// Delete account process
			.addCase(fetchDeleteAccount.pending, (state) => {
				state.deleting = true;
				state.error = null;
			})
			.addCase(fetchDeleteAccount.fulfilled, (state) => {
				state.deleting = false;
				state.error = null;
			})
			.addCase(fetchDeleteAccount.rejected, (state, { payload }) => {
				state.deleting = false;
				state.error = payload?.message ?? null;
			})

			// Edit account process
			.addCase(fetchEditAccount.pending, (state) => {
				state.updating = true;
				state.error = null;
			})
			.addCase(fetchEditAccount.fulfilled, (state, { payload }) => {
				state.account = payload;
				state.updating = false;
				state.error = null;
			})
			.addCase(fetchEditAccount.rejected, (state, { payload }) => {
				state.updating = false;
				state.error = payload?.message ?? null;
			}),
});

export const accountDataReducer = accountDataSlice.reducer;
