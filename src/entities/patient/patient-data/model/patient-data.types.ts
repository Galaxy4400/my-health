import { PatientType } from 'shared/api/patient';

export interface PatientDataState {
	patient: PatientType;
	loading: boolean;
	error: string | null;
}
