import { createSlice } from '@reduxjs/toolkit';
import { OperationListState } from './operation-list.types';
import { fetchDeleteOperation } from 'entities/operation/operation-data';
import { OPERATIONS_PER_LOAD } from 'shared/constants';
import {
	fetchGetOperationList,
	fetchAddOperationList,
	fetchFilterOperationList,
} from './operation-list.thunks';

const initialState: OperationListState = {
	operations: [],
	page: 0,
	total: 0,
	limit: OPERATIONS_PER_LOAD,
	totalPages: 0,
	loading: false,
	filtering: false,
	adding: false,
	isAll: false,
	filter: {},
	error: null,
};

export const operationListSlice = createSlice({
	name: 'operations',
	initialState,
	reducers: {
		operationListStoreClear: () => initialState,
	},
	extraReducers: (builder) =>
		builder
			// Get operation list process
			.addCase(fetchGetOperationList.pending, (state) => {
				state.filter = {};
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGetOperationList.fulfilled, (state, { payload }) => {
				state.operations = payload.items;
				state.page = payload.page;
				state.total = payload.total;
				state.totalPages = payload.totalPages;
				state.isAll = payload.page >= payload.totalPages;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchGetOperationList.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			})

			// Add operation list process
			.addCase(fetchAddOperationList.pending, (state) => {
				state.adding = true;
				state.error = null;
			})
			.addCase(fetchAddOperationList.fulfilled, (state, { payload }) => {
				state.operations = [...state.operations, ...payload.items];
				state.page = payload.page;
				state.isAll = payload.page >= payload.totalPages;
				state.adding = false;
				state.error = null;
			})
			.addCase(fetchAddOperationList.rejected, (state, { payload }) => {
				state.adding = false;
				state.error = payload?.message ?? null;
			})

			// Filter operation list process
			.addCase(fetchFilterOperationList.pending, (state) => {
				state.filter = {};
				state.filtering = true;
				state.error = null;
			})
			.addCase(fetchFilterOperationList.fulfilled, (state, { payload }) => {
				state.operations = payload.pagingData.items;
				state.page = payload.pagingData.page;
				state.total = payload.pagingData.total;
				state.totalPages = payload.pagingData.totalPages;
				state.isAll = payload.pagingData.page >= payload.pagingData.totalPages;
				state.filter = payload.filterData;
				state.filtering = false;
				state.error = null;
			})
			.addCase(fetchFilterOperationList.rejected, (state, { payload }) => {
				state.filtering = false;
				state.error = payload?.message ?? null;
			})

			// Delete operation process
			.addCase(fetchDeleteOperation.fulfilled, (state, { payload }) => {
				state.operations = state.operations.filter((operation) => operation.id !== payload);
			}),
});

export const { operationListStoreClear } = operationListSlice.actions;

export const operationListReducer = operationListSlice.reducer;
