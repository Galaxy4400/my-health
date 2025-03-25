import { createSlice } from '@reduxjs/toolkit';
import { PatientListState } from './patient-list.types';
import { fetchGetPatientList } from './patient-list.thunks';

const initialState: PatientListState = {
	patients: [],
	page: 1,
	total: 0,
	limit: 20,
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
			.addCase(fetchGetPatientList.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGetPatientList.fulfilled, (state, { payload }) => {
				state.patients = payload.items;
				state.page = payload.current_page;
				state.total = payload.total;
				state.limit = payload.per_page;
				state.totalPages = payload.total_pages;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchGetPatientList.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			}),
});

export const patientListReducer = patientListSlice.reducer;
