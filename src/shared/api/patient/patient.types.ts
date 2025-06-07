export enum Gender {
	male = 'male',
	female = 'female',
}

export interface PatientType {
	visit_id: number | null;
	visitor_id: number | null;
	gender: Gender;
	age: number;
}

export interface VisitType {
	id: number;
	datetime: string;
	visitor_id: number;
	gender: Gender;
	age: number;
}

export interface PatientRequestFormData {
	gender: Gender;
	age: number;
	heart: 'yes' | 'no';
	breathing: 'yes' | 'no';
	diabetes: 'yes' | 'no';
	pregnacy: 'yes' | 'no';
}

export interface PatientNodataData {
	gender: Gender;
	age: number;
	height?: number;
	waist?: number;
	hips?: number;
	neck?: number;
	caliper1?: number;
	caliper2?: number;
	caliper3?: number;
	visitorId?: number;
}

export interface PatientResponse {
	visit_id: number;
	visitor_id: number;
	status: string;
}

export interface MeasureStatus {
	status: string;
	message: string;
}

export interface EmailStatus {
	status: string;
	message: string;
}

export interface StatusType {
	label: string;
	title: string;
	value: number | false;
	min: number | false;
	max: number | false;
	gradientColors: string | string[];
	historyLink?: string;
	indicatorImageLink?: string;
}

export interface ScoreType {
	label: string;
	title: string;
	color: string;
	value: string;
}

export interface ResultPageData {
	status: string;
	statuses: StatusType[];
	score: ScoreType;
}

export interface SummaryPageData {
	items: ScoreType[];
	score: ScoreType;
	status: string;
}

export interface BodyPartType {
	label: string;
	row: number;
	col: number;
	gradients: StatusType[];
}

export interface BodyPageData {
	status: string;
	statuses_tab1: StatusType[];
	statuses_tab2: StatusType[];
	statuses_tab3: BodyPartType[];
	score: ScoreType;
}

export interface RisksPageData {
	status: string;
	statuses: StatusType[];
	content: string;
}

export interface NutritionPageData {
	status: string;
	content: string;
}

export interface SportPageData {
	status: string;
	content: string;
}

export interface SpinePageData {
	status: string;
	content: string;
	score: ScoreType;
}

export interface CirculationPageData {
	status: string;
	content: string;
	score: ScoreType;
}

export interface ModelResponseData {
	status: string;
	url: string;
}

export interface PatientSendFormData {
	email: string;
	reportType: string;
}

export interface PatientPrintFormData {
	reportType: string;
}

export interface PatientCardFormData {
	code: string;
}

export interface MeasureProcessStatus {
	status: string;
	content: string;
	datetime: string;
	message: string;
	percent: number;
	step: number;
	subtitle: string;
	title: string;
}

export interface Override {
	height?: number;
	spo2?: number;
	heartrate?: number;
	systolic?: number;
	diastolic?: number;
}
