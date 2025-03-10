import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PatientDataState } from './patient-data.types';
import { PatientType, Sex } from 'shared/api/patient';

const initialState: PatientDataState = {
	patient: {
		sex: Sex.man,
		age: 0,
	},
	loading: false,
	creating: false,
	deleting: false,
	updating: false,
	error: null,
};

export const patientDataSlice = createSlice({
	name: 'patient',
	initialState,
	reducers: {
		setPatientData: (state, action: PayloadAction<PatientType>) => {
			state.patient = action.payload;
		},
		resetPatientData: () => initialState,
	},
});

export const { setPatientData, resetPatientData } = patientDataSlice.actions;

export const patientDataReducer = patientDataSlice.reducer;
