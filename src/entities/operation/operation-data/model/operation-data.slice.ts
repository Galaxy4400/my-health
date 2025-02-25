import { createSlice } from '@reduxjs/toolkit';
import { OperationDataState } from './operation-data.types';
import { fetchCreateOperation, fetchDeleteOperation, fetchGetOperationData } from './operation-data.thunks';

const initialState: OperationDataState = {
	operation: {
		id: '',
		user: '',
		account: null,
		category: null,
		name: '',
		amount: 0,
		comment: '',
		status: false,
		createdAt: '',
	},
	loading: false,
	creating: false,
	deleting: false,
	error: null,
};

export const operationDataSlice = createSlice({
	name: 'operation',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			// Get operation process
			.addCase(fetchGetOperationData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGetOperationData.fulfilled, (state, { payload }) => {
				state.operation = payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchGetOperationData.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			})

			// Create operation process
			.addCase(fetchCreateOperation.pending, (state) => {
				state.creating = true;
				state.error = null;
			})
			.addCase(fetchCreateOperation.fulfilled, (state, { payload }) => {
				state.operation = payload;
				state.creating = false;
				state.error = null;
			})
			.addCase(fetchCreateOperation.rejected, (state, { payload }) => {
				state.creating = false;
				state.error = payload?.message ?? null;
			})

			// Delete operation process
			.addCase(fetchDeleteOperation.pending, (state) => {
				state.deleting = true;
				state.error = null;
			})
			.addCase(fetchDeleteOperation.fulfilled, (state) => {
				state.deleting = false;
				state.error = null;
			})
			.addCase(fetchDeleteOperation.rejected, (state, { payload }) => {
				state.deleting = false;
				state.error = payload?.message ?? null;
			}),
});

export const operationDataReducer = operationDataSlice.reducer;
