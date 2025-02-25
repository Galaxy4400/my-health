import { CategoryType } from 'shared/api/category';

export interface CategoryDataState {
	category: CategoryType;
	loading: boolean;
	creating: boolean;
	deleting: boolean;
	updating: boolean;
	error: string | null;
}
