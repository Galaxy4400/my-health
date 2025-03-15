import { createSlice } from '@reduxjs/toolkit';
import { AppDataState } from './application.types';
import { fetchGetApplication } from './application.thunks';

const initialState: AppDataState = {
	application: {
		background: {},
		idleTimeout: 20,
		slider: [],
	},
	loading: false,
	error: null,
};

export const applicationSlice = createSlice({
	name: 'application',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(fetchGetApplication.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGetApplication.fulfilled, (state, { payload }) => {
				state.application = payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchGetApplication.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			}),
});

export const applicationReducer = applicationSlice.reducer;
