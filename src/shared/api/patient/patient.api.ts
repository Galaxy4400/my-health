import { request } from '../request';
import { RequestData } from '../types';
import { PatientRequestFormData, PatientResponse } from './patient.types';

export const visitPatient = (submittedData: PatientRequestFormData): Promise<PatientResponse> => {
	const requestData: RequestData = {
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

	return request({ method: 'POST', data: requestData });
};
