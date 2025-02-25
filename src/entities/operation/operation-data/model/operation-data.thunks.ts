import { createAsyncThunk } from '@reduxjs/toolkit';
import { RequestData } from 'shared/api';
import { OperationType, createOperation, deleteOperation, getOperation } from 'shared/api/operation';
import { ErrorType, ID } from 'shared/types';

export const fetchGetOperationData = createAsyncThunk<OperationType, ID, { rejectValue: ErrorType }>(
	'operation/fetchGetOperationData',
	async (id, { rejectWithValue }) => {
		try {
			const { operation, error } = await getOperation(id);

			if (!operation) {
				throw new Error(error as string);
			}

			return operation;
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);

export const fetchCreateOperation = createAsyncThunk<OperationType, RequestData, { rejectValue: ErrorType }>(
	'operation/fetchCreateOperation',
	async (submittedData, { rejectWithValue }) => {
		try {
			const { operation, error } = await createOperation(submittedData);

			if (!operation) {
				throw new Error(error as string);
			}

			return operation;
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);

export const fetchDeleteOperation = createAsyncThunk<ID, ID, { rejectValue: ErrorType }>(
	'operation/fetchDeleteOperation',
	async (id, { rejectWithValue }) => {
		try {
			const { error } = await deleteOperation(id);

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
