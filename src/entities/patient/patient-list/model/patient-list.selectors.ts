import { createSelector } from '@reduxjs/toolkit';

const selectPatientListState = (state: RootState) => state.patientList;

export const selectPatientList = createSelector(selectPatientListState, (state) => state.patients);

export const selectPatientListLoading = createSelector(selectPatientListState, (state) => state.loading);

export const selectPatientListError = createSelector(selectPatientListState, (state) => state.error);

export const selectPatientListPage = createSelector(selectPatientListState, (state) => state.page);

export const selectPatientListLimit = createSelector(selectPatientListState, (state) => state.limit);

export const selectPatientListTotal = createSelector(selectPatientListState, (state) => state.total);

export const selectPatientListTotalPages = createSelector(
	selectPatientListState,
	(state) => state.totalPages,
);
