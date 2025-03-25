import { createSlice } from '@reduxjs/toolkit';
import { PatientListState } from './patient-list.types';
import { fetchPatientVisit } from './patient-list.thunks';

const initialState: PatientListState = {
	patients: [],
	page: 0,
	total: 0,
	totalPages: 0,
	loading: false,
	error: null,
};

export const patientListSlice = createSlice({
	name: 'patients',
	initialState,
	reducers: {},
	extraReducers: (builder) =>
		builder
			.addCase(fetchGetCategoryList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGetCategoryList.fulfilled, (state, { payload }) => {
				state.categories = payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchGetCategoryList.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			}),
});

export const patientListReducer = patientListSlice.reducer;
