import css from './category-edit.module.scss';
import { useEffect } from 'react';
import { categoryEditFormRules } from './category-edit.rules';
import { yupResolver } from '@hookform/resolvers/yup';
import { useParams } from 'react-router-dom';
import { Button, Form, Input, Radio, RadioComponent } from 'shared/ui/form-components';
import { Block, Fieldset, Loading } from 'shared/ui/components';
import { RequestData } from 'shared/api';
import { useToast } from 'app/providers/toast';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { CATEGORY_TYPES } from 'shared/lib/category';
import {
	fetchEditCategory,
	fetchGetCategoryData,
	selectCategoryData,
	selectCategoryDataError,
	selectCategoryDataId,
	selectCategoryDataLoading,
	selectCategoryDataUpdating,
} from 'entities/category/category-data';

export const CategoryEditForm = () => {
	const { id } = useParams();
	const category = useAppSelector(selectCategoryData);
	const currentCategoryId = useAppSelector(selectCategoryDataId);
	const isLoading = useAppSelector(selectCategoryDataLoading);
	const isUpdating = useAppSelector(selectCategoryDataUpdating);
	const error = useAppSelector(selectCategoryDataError);
	const dispatch = useAppDispatch();
	const { showToast } = useToast();

	useEffect(() => {
		if (id && id !== currentCategoryId) dispatch(fetchGetCategoryData(id));
	}, [currentCategoryId, dispatch, id]);

	const submitHandler = async (editData: RequestData) => {
		await dispatch(fetchEditCategory({ id: category.id, submittedData: editData }));

		showToast({ message: 'Изменения внесены', type: 'success' });
	};

	if (error) {
		showToast({ message: error, type: 'error' });
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Block className={css['block']}>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(categoryEditFormRules)}>
				<Input type="text" name="name" defaultValue={category.name} label="Название категории" />
				<Fieldset label="Тип категории">
					<div className={css['radiobuttons']}>
						{CATEGORY_TYPES.map((type) => (
							<Radio
								key={type.id}
								name="type"
								value={type.id}
								label={type.name}
								defaultChecked={type.id === category.type}
							/>
						))}
					</div>
				</Fieldset>
				<Fieldset label="Иконка категории">
					<div className={css['icons']}></div>
				</Fieldset>
				<Button type="submit" disabled={isUpdating} loading={isUpdating}>
					Внести изменения
				</Button>
			</Form>
		</Block>
	);
};
