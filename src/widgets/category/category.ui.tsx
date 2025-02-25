import { useParams } from 'react-router-dom';
import { CategoryDelete } from 'features/category';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import {
	CategoryView,
	fetchGetCategoryData,
	selectCategoryData,
	selectCategoryDataId,
	selectCategoryDataLoading,
} from 'entities/category/category-data';
import { useEffect } from 'react';
import { Loading } from 'shared/ui/components';

export const Category = () => {
	const { id } = useParams();
	const category = useAppSelector(selectCategoryData);
	const currentCategoryId = useAppSelector(selectCategoryDataId);
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectCategoryDataLoading);

	useEffect(() => {
		if (id && id !== currentCategoryId) dispatch(fetchGetCategoryData(id));
	}, [currentCategoryId, dispatch, id]);

	if (isLoading) {
		return <Loading />;
	}

	return <CategoryView category={category} deleteSlot={<CategoryDelete categoryId={category.id} />} />;
};
