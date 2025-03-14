import { request } from '../request';
import { RequestData } from '../types';
import { MeasureStatus, PatientRequestFormData, PatientResponse } from './patient.types';

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

export const measurePatient = (step: number, visitId: number): Promise<MeasureStatus> => {
	const requestData: RequestData = {
		action: 'examination',
		subaction: 'step',
		step: step,
		visit_id: visitId,
	};

	return request({ method: 'POST', data: requestData });
};

export const resultsPatient = (visitId: number): Promise<MeasureStatus> => {
	const requestData: RequestData = {
		action: 'report',
		visit_id: visitId,
	};

	return request({ method: 'POST', data: requestData });
};
