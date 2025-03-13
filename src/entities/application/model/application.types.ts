import { ApplicationType } from 'shared/api/application';

export interface AppDataState {
	application: ApplicationType;
	loading: boolean;
	error: string | null;
}
