import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { applicationReducer } from 'entities/application/model/application.slice';
import { patientDataReducer } from 'entities/patient/patient-data';
import { patientListReducer } from 'entities/patient/patient-list';

const rootReducer = combineReducers({
	applicationData: applicationReducer,
	patientData: patientDataReducer,
	patientList: patientListReducer,
});

export const store = configureStore({ reducer: rootReducer });
