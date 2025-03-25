import { createAsyncThunk } from '@reduxjs/toolkit';
import { PatientRequestFormData, PatientType, patientVisitRequest } from 'shared/api/patient';
import { ErrorType } from 'shared/types';

// export const fetchPatientVisit = createAsyncThunk<
// 	PatientType,
// 	PatientRequestFormData,
// 	{ rejectValue: ErrorType }
// >('patient/fetchPatientVisit', async (submittedData, { rejectWithValue }) => {
// 	try {
// 		const { status, visit_id } = await patientVisitRequest(submittedData);

// 		if (status !== 'ok') {
// 			throw new Error('Ошибка при регистрации пациента');
// 		}

// 		return {
// 			visit_id,
// 			gender: submittedData.gender,
// 			age: submittedData.age,
// 		};
// 	} catch (error: unknown) {
// 		const knownError = error as ErrorType;

// 		return rejectWithValue(knownError);
// 	}
// });

export const fetchGetPatientList = createAsyncThunk<PatientType[], void, { rejectValue: ErrorType }>(
	'patients/fetchGetPatientList',
	async (_, { rejectWithValue }) => {
		try {
			const { categories, error } = await getPatients();

			if (!categories) {
				throw new Error(error as string);
			}

			return categories;
		} catch (error: unknown) {
			const knownError = error as ErrorType;

			return rejectWithValue(knownError);
		}
	},
);
