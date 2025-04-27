import { createSlice } from '@reduxjs/toolkit';
import { PatientDataState } from './patient-data.types';
import { Gender, VisitType } from 'shared/api/patient';
import { fetchPatientVisit } from './patient-data.thunks';

const initialState: PatientDataState = {
	patient: {
		visit_id: null,
		visitor_id: null,
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
		setPatientData: (state, { payload }: { payload: VisitType }) => {
			state.patient.visit_id = payload.id;
			state.patient.visitor_id = payload.visitor_id;
			state.patient.gender = payload.gender;
			state.patient.age = payload.age;
		},
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

export const { clearPatientData, setPatientData } = patientDataSlice.actions;

export const patientDataReducer = patientDataSlice.reducer;
