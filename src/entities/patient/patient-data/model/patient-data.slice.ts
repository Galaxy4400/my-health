import { createSlice } from '@reduxjs/toolkit';
import { PatientDataState } from './patient-data.types';
import { Gender } from 'shared/api/patient';
import { fetchPatientVisit } from './patient-data.thunks';

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
	reducers: {
		clearPatientData: () => initialState,
	},
	extraReducers: (builder) =>
		builder
			.addCase(fetchPatientVisit.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchPatientVisit.fulfilled, (state, { payload }) => {
				state.patient = payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchPatientVisit.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			}),
});

export const { clearPatientData } = patientDataSlice.actions;

export const patientDataReducer = patientDataSlice.reducer;
