import { CategoryType } from 'shared/api/category';

export interface CategoryListState {
	categories: CategoryType[];
	loading: boolean;
	error: string | null;
}
