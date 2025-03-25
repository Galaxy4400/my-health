import { VisitType } from 'shared/api/patient';

export interface PatientListState {
	patients: VisitType[];
	page: number;
	total: number;
	limit: number;
	totalPages: number;
	loading: boolean;
	error: string | null;
}
