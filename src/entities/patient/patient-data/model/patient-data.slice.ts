import { createSlice } from '@reduxjs/toolkit';
import { PatientDataState } from './patient-data.types';
import { Gender } from 'shared/api/patient';
import { fetchVisitPatient } from './patient-data.thunks';

const initialState: PatientDataState = {
	patient: {
		visit_id: null,
		gender: Gender.male,
		age: 0,
	},
	loading: false,
	error: null,
};

export const patientDataSlice = createSlice({
	name: 'patient',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(fetchVisitPatient.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchVisitPatient.fulfilled, (state, { payload }) => {
				state.patient = payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchVisitPatient.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			}),
});

export const patientDataReducer = patientDataSlice.reducer;
