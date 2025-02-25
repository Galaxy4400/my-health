import { ID } from 'shared/types';
import { AccountType } from '../account';
import { CategoryType } from '../category';
import { PagingData } from '../types';

export interface OperationType {
	id: ID;
	user: ID;
	account: Pick<AccountType, 'name' | 'type'> | null;
	category: Pick<CategoryType, 'name' | 'icon' | 'type'> | null;
	name: string;
	amount: number;
	comment: string;
	status: boolean;
	createdAt: string;
}

export interface OperationQueryParams {
	limit?: number;
	page?: number;
	account?: ID;
	category?: ID;
	daterange?: string;
	amountrange?: string;
}

export interface OperationResponse {
	readonly error: string | null;
	readonly operation: OperationType | null;
}

export interface OperationsResponse {
	readonly error: string | null;
	readonly pagingData: PagingData<OperationType> | null;
}
