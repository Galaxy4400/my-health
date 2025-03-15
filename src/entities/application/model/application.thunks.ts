import { createAsyncThunk } from '@reduxjs/toolkit';
import { ApplicationType, getApplicationDataRequest } from 'shared/api/application';
import { ErrorType } from 'shared/types';

export const fetchGetApplication = createAsyncThunk<ApplicationType, void, { rejectValue: ErrorType }>(
	'application/fetchGetApplication',
	async (_, { rejectWithValue }) => {
		try {
			const { status, ...rest } = await getApplicationDataRequest();

			if (status !== 'ok') {
				throw new Error('Ошибка получения данных приложения');
			}

			return {
				background: rest.background,
				idleTimeout: rest.general.idleTimeout,
				slider: rest.slider,
			};
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);
