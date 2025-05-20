import { createSelector } from '@reduxjs/toolkit';

const selectApplicationState = (state: RootState) => state.applicationData;

export const selectApplicationData = createSelector(selectApplicationState, (state) => state.application);

export const selectOverrideData = createSelector(selectApplicationState, (state) => state.override);

export const selectSummeryPageStatus = createSelector(selectApplicationState, (state) => state.summeryPage);

export const selectApplicationSlider = createSelector(
	selectApplicationState,
	(state) => state.application.slider,
);

export const selectApplicationDoctor = createSelector(
	selectApplicationState,
	(state) => state.application.doctorRegisterLink,
);

export const selectApplicationDevices = createSelector(
	selectApplicationState,
	(state) => state.application.devices,
);

export const selectApplicationPhrases = createSelector(
	selectApplicationState,
	(state) => state.application.sounds,
);

export const selectApplicationBackgound = createSelector(
	selectApplicationState,
	(state) => state.application.background,
);

export const selectApplicationIdle = createSelector(
	selectApplicationState,
	(state) => state.application.idleTimeout,
);

export const selectApplicationDataLoading = createSelector(selectApplicationState, (state) => state.loading);

export const selectApplicationError = createSelector(selectApplicationState, (state) => state.error);
