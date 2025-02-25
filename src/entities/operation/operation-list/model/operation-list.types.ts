import { OperationQueryParams, OperationType } from 'shared/api/operation';

export interface OperationListState {
	operations: OperationType[];
	page: number;
	total: number;
	limit: number;
	totalPages: number;
	loading: boolean;
	filtering: boolean;
	adding: boolean;
	isAll: boolean;
	filter: OperationQueryParams;
	error: string | null;
}
