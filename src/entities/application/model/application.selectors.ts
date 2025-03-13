import { createSelector } from '@reduxjs/toolkit';

const selectApplicationState = (state: RootState) => state.applicationData;

export const selectApplicationData = createSelector(selectApplicationState, (state) => state.application);

export const selectMainSlider = createSelector(selectApplicationState, (state) => state.application.slider);

export const selectMainBackgound = createSelector(
	selectApplicationState,
	(state) => state.application.background,
);

export const selectIdle = createSelector(selectApplicationState, (state) => state.application.idleTimeout);

export const selectAccountListLoading = createSelector(selectApplicationState, (state) => state.loading);

export const selectAccountListError = createSelector(selectApplicationState, (state) => state.error);
