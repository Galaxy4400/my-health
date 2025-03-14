import { createAsyncThunk } from '@reduxjs/toolkit';
import { PatientRequestFormData, PatientType, visitPatient } from 'shared/api/patient';
import { ErrorType } from 'shared/types';

export const fetchVisitPatient = createAsyncThunk<
	PatientType,
	PatientRequestFormData,
	{ rejectValue: ErrorType }
>('patient/fetchVisitPatient', async (submittedData, { rejectWithValue }) => {
	try {
		const { status, visit_id } = await visitPatient(submittedData);

		if (status !== 'ok') {
			throw new Error('Ошибка при регистрации пациента');
		}

		return {
			visit_id,
			gender: submittedData.gender,
			age: submittedData.age,
		};
	} catch (error: unknown) {
		const knownError = error as ErrorType;

		return rejectWithValue(knownError);
	}
});
