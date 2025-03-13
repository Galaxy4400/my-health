import { createSelector } from '@reduxjs/toolkit';

const selectApplicationState = (state: RootState) => state.applicationData;

export const selectApplicationData = createSelector(selectApplicationState, (state) => state.application);

export const selectApplicationSlider = createSelector(
	selectApplicationState,
	(state) => state.application.slider,
);

export const selectMainBackgound = createSelector(
	selectApplicationState,
	(state) => state.application.background,
);

export const selectApplicationIdle = createSelector(
	selectApplicationState,
	(state) => state.application.idleTimeout,
);

export const selectApplicationDataLoading = createSelector(selectApplicationState, (state) => state.loading);

export const selectApplicationError = createSelector(selectApplicationState, (state) => state.error);
