import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { applicationReducer } from 'entities/application/model/application.slice';
import { patientDataReducer } from 'entities/patient/patient-data';

const rootReducer = combineReducers({
	applicationData: applicationReducer,
	patientData: patientDataReducer,
});

export const store = configureStore({ reducer: rootReducer });
