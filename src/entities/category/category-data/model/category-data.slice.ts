import { createSlice } from '@reduxjs/toolkit';
import { CategoryDataState } from './category-data.types';
import {
	fetchCreateCategory,
	fetchDeleteCategory,
	fetchEditCategory,
	fetchGetCategoryData,
} from './category-data.thunks';

const initialState: CategoryDataState = {
	category: {
		id: '',
		name: '',
		type: '',
		createdAt: '',
	},
	loading: false,
	creating: false,
	deleting: false,
	updating: false,
	error: null,
};

export const categoryDataSlice = createSlice({
	name: 'category',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			// Get category process
			.addCase(fetchGetCategoryData.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGetCategoryData.fulfilled, (state, { payload }) => {
				state.category = payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchGetCategoryData.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			})

			// Create category process
			.addCase(fetchCreateCategory.pending, (state) => {
				state.creating = true;
				state.error = null;
			})
			.addCase(fetchCreateCategory.fulfilled, (state, { payload }) => {
				state.category = payload;
				state.creating = false;
				state.error = null;
			})
			.addCase(fetchCreateCategory.rejected, (state, { payload }) => {
				state.creating = false;
				state.error = payload?.message ?? null;
			})

			// Delete category process
			.addCase(fetchDeleteCategory.pending, (state) => {
				state.deleting = true;
				state.error = null;
			})
			.addCase(fetchDeleteCategory.fulfilled, (state) => {
				state.deleting = false;
				state.error = null;
			})
			.addCase(fetchDeleteCategory.rejected, (state, { payload }) => {
				state.deleting = false;
				state.error = payload?.message ?? null;
			})

			// Edit category process
			.addCase(fetchEditCategory.pending, (state) => {
				state.updating = true;
				state.error = null;
			})
			.addCase(fetchEditCategory.fulfilled, (state, { payload }) => {
				state.category = payload;
				state.updating = false;
				state.error = null;
			})
			.addCase(fetchEditCategory.rejected, (state, { payload }) => {
				state.updating = false;
				state.error = payload?.message ?? null;
			}),
});

export const categoryDataReducer = categoryDataSlice.reducer;
