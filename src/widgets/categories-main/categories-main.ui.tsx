import css from './categories-main.module.scss';
import { CategoryDelete } from 'features/category';
import { Block, Loading } from 'shared/ui/components';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { useEffect } from 'react';
import {
	CategoryItem,
	fetchGetCategoryList,
	selectCategoryList,
	selectCategoryListLoading,
} from 'entities/category/category-list';

export const CategoriesMain = () => {
	const categories = useAppSelector(selectCategoryList);

	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectCategoryListLoading);

	useEffect(() => {
		dispatch(fetchGetCategoryList());
	}, [dispatch]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Block className={css['main']}>
			<h4 className={css['title']}>Список категорий</h4>
			<div className={css['list']}>
				{categories?.map((category) => (
					<CategoryItem
						key={category.id}
						category={category}
						deleteSlot={<CategoryDelete categoryId={category.id} />}
					/>
				))}
			</div>
		</Block>
	);
};
