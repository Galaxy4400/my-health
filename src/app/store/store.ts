import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { patientDataReducer } from 'entities/patient/patient-data';

const rootReducer = combineReducers({
	patientData: patientDataReducer,
});

export const store = configureStore({ reducer: rootReducer });
