import { ApplicationType } from 'shared/api/application';
import { Override } from 'shared/api/patient';

export interface AppDataState {
	application: ApplicationType;
	override: Override | null;
	summeryPage: boolean;
	loading: boolean;
	error: string | null;
}
