import { request } from '../request';
import { PagingData, RequestData } from '../types';
import {
	BodyPageData,
	EmailStatus,
	MeasureProcessStatus,
	MeasureStatus,
	ModelResponseData,
	NutritionPageData,
	Override,
	PatientCardFormData,
	PatientNodataData,
	PatientPrintFormData,
	PatientResponse,
	PatientSendFormData,
	ResultPageData,
	RisksPageData,
	SportPageData,
	SummaryPageData,
	VisitType,
} from './patient.types';

export const patientVisitRequest = (submittedData: PatientNodataData): Promise<PatientResponse> => {
	const requestData: RequestData = {
		action: 'examination',
		subaction: 'start',
		patient: {
			gender: submittedData.gender,
			age: submittedData.age,
			devicedata: {
				heightMeter: submittedData.height || 0,
			},
		},
	};

	return request({ method: 'POST', data: requestData });
};

export const patientMeasureRequest = (
	step: number,
	visitId: number,
	override: Override | null,
): Promise<MeasureStatus> => {
	const requestData: RequestData = {
		action: 'examination',
		subaction: 'step',
		step: step,
		visit_id: visitId,
		...(override && { override: override as RequestData }),
	};

	return request({ method: 'POST', data: requestData });
};

export const patientResultsRequest = (visitId: number): Promise<MeasureStatus> => {
	const requestData: RequestData = {
		action: 'report',
		visit_id: visitId,
	};

	return request({ method: 'POST', data: requestData });
};

export const patientSummaryRequest = (visitId: number | null): Promise<SummaryPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const patientBodyRequest = (visitId: number | null): Promise<BodyPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'body',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const patientMetabolicRequest = (visitId: number | null): Promise<ResultPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'metabolic',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const patientStressRequest = (visitId: number | null): Promise<ResultPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'stress',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const patientCardioRequest = (visitId: number | null): Promise<ResultPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'heart',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const patientRisksRequest = (visitId: number | null): Promise<RisksPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'risks',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const patientNutritionRequest = (visitId: number | null): Promise<NutritionPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'nutrition',
		visit_id: visitId || 0,
	};

	return request({ method: 'POST', data: requestData });
};

export const patientSportRequest = (visitId: number | null): Promise<SportPageData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'page',
		page: 'assignments',
		visit_id: visitId || 0,
	};

	return request({ method: 'POST', data: requestData });
};

export const patientEmailRequest = (
	visitId: number | null,
	submittedData: PatientSendFormData,
): Promise<EmailStatus> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'email',
		email: submittedData.email,
		reportType: submittedData.reportType,
		visit_id: visitId || 0,
	};

	return request({ method: 'POST', data: requestData });
};

export const patientPrintRequest = (
	visitId: number | null,
	submittedData: PatientPrintFormData,
): Promise<EmailStatus> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'print',
		reportType: submittedData.reportType,
		visit_id: visitId || 0,
	};

	return request({ method: 'POST', data: requestData });
};

export const patientCardRequest = (
	visitId: number | null,
	submittedData: PatientCardFormData,
): Promise<EmailStatus> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: 'medcard',
		code: submittedData.code,
		visit_id: visitId || 0,
	};

	return request({ method: 'POST', data: requestData });
};

export const patient3dModelRequest = (visitId: number | null): Promise<ModelResponseData> => {
	const requestData: RequestData = {
		action: 'report',
		subaction: '3d',
		visit_id: visitId || 0,
	};
	return request({ method: 'POST', data: requestData });
};

export const patientMeasureStatusRequest = (visitId: number | null): Promise<MeasureProcessStatus> => {
	const requestData: RequestData = { action: 'progress', visit_id: visitId || 0 };
	return request({ method: 'POST', data: requestData });
};

export const patientListRequest = (page: number): Promise<PagingData<VisitType>> => {
	const requestData: RequestData = {
		action: 'admin',
		subaction: 'reports',
		page,
	};

	return request({ method: 'POST', data: requestData });
};
