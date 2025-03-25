import { PatientType } from 'shared/api/patient';

export interface PatientListState {
	patients: PatientType[];
	page: number;
	total: number;
	limit: number;
	totalPages: number;
	loading: boolean;
	error: string | null;
}
