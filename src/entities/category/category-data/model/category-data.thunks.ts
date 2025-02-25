import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestData } from 'shared/api';
import { CategoryType, createCategory, deleteCategory, editCategory, getCategory } from 'shared/api/category';
import { ErrorType, ID } from 'shared/types';

export const fetchGetCategoryData = createAsyncThunk<CategoryType, ID, { rejectValue: ErrorType }>(
	'category/fetchGetCategoryData',
	async (id, { rejectWithValue }) => {
		try {
			const { category, error } = await getCategory(id);

			if (!category) {
				throw new Error(error as string);
			}

			return category;
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);

export const fetchCreateCategory = createAsyncThunk<CategoryType, RequestData, { rejectValue: ErrorType }>(
	'category/fetchCreateCategory',
	async (submittedData, { rejectWithValue }) => {
		try {
			const { category, error } = await createCategory(submittedData);

			if (!category) {
				throw new Error(error as string);
			}

			return category;
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);

export const fetchDeleteCategory = createAsyncThunk<ID, ID, { rejectValue: ErrorType }>(
	'category/fetchDeleteCategory',
	async (id, { rejectWithValue }) => {
		try {
			const { error } = await deleteCategory(id);

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

export const fetchEditCategory = createAsyncThunk<
	CategoryType,
	{ id: ID; submittedData: RequestData },
	{ rejectValue: ErrorType }
>('category/fetchEditCategory', async ({ id, submittedData }, { rejectWithValue }) => {
	try {
		const { category, error } = await editCategory(id, submittedData);

		if (!category) {
			throw new Error(error as string);
		}

		return category;
	} catch (error: unknown) {
		const knownError = error as ErrorType;

		return rejectWithValue(knownError);
	}
});
