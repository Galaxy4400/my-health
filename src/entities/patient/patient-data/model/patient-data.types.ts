import { PatientType } from 'shared/api/patient';

export interface PatientDataState {
	patient: PatientType;
	loading: boolean;
	creating: boolean;
	deleting: boolean;
	updating: boolean;
	error: string | null;
}
