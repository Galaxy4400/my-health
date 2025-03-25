import { createAsyncThunk } from '@reduxjs/toolkit';
import { PagingData } from 'shared/api';
import { patientListRequest, PatientType } from 'shared/api/patient';
import { ErrorType } from 'shared/types';

export const fetchGetPatientList = createAsyncThunk<
	PagingData<PatientType>,
	number,
	{ rejectValue: ErrorType }
>('patients/fetchGetPatientList', async (page, { rejectWithValue }) => {
	try {
		const response = await patientListRequest(page);

		if (response.status !== 'ok') {
			throw new Error(response.message as string);
		}

		return response;
	} catch (error: unknown) {
		const knownError = error as ErrorType;

		return rejectWithValue(knownError);
	}
});
