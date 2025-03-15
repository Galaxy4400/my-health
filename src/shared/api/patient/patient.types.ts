export enum Gender {
	male = 'male',
	female = 'female',
}

export interface PatientType {
	visit_id: number | null;
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

export interface PatientResponse {
	visit_id: number;
	status: string;
}

export interface MeasureStatus {
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

export interface ModelResponseData {
	status: string;
	url: string;
}
