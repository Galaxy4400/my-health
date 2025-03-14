import { request } from '../request';
import { QueryData } from '../types';
import { PatientRequestFormData, PatientResponse } from './patient.types';

export const visitPatient = (submittedData: PatientRequestFormData): Promise<PatientResponse> => {
	const queryData: QueryData = {
		action: 'examination',
		subaction: 'start',
		patient: {
			gender: submittedData.gender,
			age: submittedData.age,
			diseases: {
				heart: submittedData.heart,
				breathing: submittedData.breathing,
				diabetes: submittedData.diabetes,
				pregnacy: submittedData.pregnacy,
			},
		},
	};

	return request({ query: queryData });
};
