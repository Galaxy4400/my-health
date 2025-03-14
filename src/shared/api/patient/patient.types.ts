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
