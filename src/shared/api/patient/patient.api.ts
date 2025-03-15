import { request } from '../request';
import { RequestData } from '../types';
import {
	BodyPageData,
	MeasureStatus,
	ModelResponseData,
	NutritionPageData,
	PatientRequestFormData,
	PatientResponse,
	ResultPageData,
	RisksPageData,
	SummaryPageData,
} from './patient.types';

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

export const summaryPatient = (visitId: number | null): Promise<SummaryPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const bodyPatient = (visitId: number | null): Promise<BodyPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'body',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const metabolicPatient = (visitId: number | null): Promise<ResultPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'metabolic',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const stressPatient = (visitId: number | null): Promise<ResultPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'stress',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const cardioPatient = (visitId: number | null): Promise<ResultPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'heart',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const risksPatient = (visitId: number | null): Promise<RisksPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'risks',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const nutritionPatient = (visitId: number | null): Promise<NutritionPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'nutrition',
		visit_id: visitId || 0,
	};

	return request({ method: 'POST', data: requestData });
};

export const model3dPatient = (visitId: number | null): Promise<ModelResponseData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: '3d',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};
