import { PatientType } from 'shared/api/patient';

export interface PatientListState {
	patients: PatientType[];
	page: number;
	total: number;
	totalPages: number;
	loading: boolean;
	error: string | null;
}
