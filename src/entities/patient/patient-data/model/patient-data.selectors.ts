import { createSelector } from '@reduxjs/toolkit';

const selectPatientDataState = (state: RootState) => state.patientData;

export const selectPatientData = createSelector(selectPatientDataState, (state) => state.patient);

export const selectPatientDataLoading = createSelector(selectPatientDataState, (state) => state.loading);

export const selectPatientDataCreating = createSelector(selectPatientDataState, (state) => state.creating);

export const selectPatientDataDeleting = createSelector(selectPatientDataState, (state) => state.deleting);

export const selectPatientDataUpdating = createSelector(selectPatientDataState, (state) => state.updating);

export const selectPatientDataError = createSelector(selectPatientDataState, (state) => state.error);
