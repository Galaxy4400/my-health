import { createSlice } from '@reduxjs/toolkit';
import { AppDataState } from './application.types';
import { fetchGetApplication } from './application.thunks';
import { Override } from 'shared/api/patient';

const initialState: AppDataState = {
	application: {
		background: {},
		idleTimeout: 20,
		slider: [],
		sounds: {
			mainscreen_intro: '',
			examination_start: '',
			examination_step1: '',
			examination_step2: '',
			examination_step3: '',
			examination_examenation: '',
		},
		devices: {
			heightMeter: true,
			questionnaire: true,
			'buttons.email': true,
			'buttons.medcard': true,
			'buttons.print': true,
			tape: true,
		},
		doctorRegisterLink: '',
	},
	override: null,
	summeryPage: true,
	loading: false,
	error: null,
};

export const applicationSlice = createSlice({
	name: 'application',
	initialState,
	reducers: {
		setOverride: (state, { payload }: { payload: Override }) => {
			state.override = payload;
		},
		clearOverride: (state) => {
			state.override = null;
		},
		setSummeryPageStatus: (state, { payload }: { payload: boolean }) => {
			state.summeryPage = payload;
		},
	},
	extraReducers: (builder) =>
		builder
			.addCase(fetchGetApplication.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGetApplication.fulfilled, (state, { payload }) => {
				state.application = payload;
				state.loading = false;
				state.error = null;
			})
			.addCase(fetchGetApplication.rejected, (state, { payload }) => {
				state.loading = false;
				state.error = payload?.message ?? null;
			}),
});

export const { setOverride, clearOverride, setSummeryPageStatus } = applicationSlice.actions;

export const applicationReducer = applicationSlice.reducer;
