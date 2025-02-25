import { OperationType } from 'shared/api/operation';

export interface OperationDataState {
	operation: OperationType;
	loading: boolean;
	creating: boolean;
	deleting: boolean;
	error: string | null;
}
