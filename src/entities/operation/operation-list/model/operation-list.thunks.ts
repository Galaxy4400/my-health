import { createAsyncThunk } from '@reduxjs/toolkit';
import { PagingData, QueryData } from 'shared/api';
import { getOperations, OperationQueryParams, OperationType } from 'shared/api/operation';
import { OPERATIONS_PER_LOAD } from 'shared/constants';
import { ErrorType } from 'shared/types';

export const fetchGetOperationList = createAsyncThunk<
	PagingData<OperationType>,
	OperationQueryParams & QueryData,
	{ rejectValue: ErrorType }
>('operations/fetchGetOperationList', async (queryData, { rejectWithValue }) => {
	try {
		const { pagingData, error } = await getOperations(queryData);

		if (!pagingData) {
			throw new Error(error as string);
		}

		return pagingData;
	} catch (error: unknown) {
		const knownError = error as ErrorType;

		return rejectWithValue(knownError);
	}
});

export const fetchAddOperationList = createAsyncThunk<
	PagingData<OperationType>,
	OperationQueryParams & QueryData,
	{ rejectValue: ErrorType }
>('operations/fetchAddOperationList', async (queryData, { rejectWithValue }) => {
	try {
		const { pagingData, error } = await getOperations(queryData);

		if (!pagingData) {
			throw new Error(error as string);
		}

		return pagingData;
	} catch (error: unknown) {
		const knownError = error as ErrorType;

		return rejectWithValue(knownError);
	}
});

export const fetchFilterOperationList = createAsyncThunk<
	{ pagingData: PagingData<OperationType>; filterData: OperationQueryParams },
	OperationQueryParams & QueryData,
	{ rejectValue: ErrorType }
>('operations/fetchFilterOperationList', async (filterData, { rejectWithValue }) => {
	filterData.limit = OPERATIONS_PER_LOAD;

	try {
		const { pagingData, error } = await getOperations(filterData);

		if (!pagingData) {
			throw new Error(error as string);
		}

		return { pagingData, filterData };
	} catch (error: unknown) {
		const knownError = error as ErrorType;

		return rejectWithValue(knownError);
	}
});
