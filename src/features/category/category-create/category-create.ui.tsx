import css from './category-create.module.scss';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { categoryCreateFormRules } from './category-create.rules';
import { Button, Form, Input, Radio, RadioComponent } from 'shared/ui/form-components';
import { path } from 'shared/lib/router';
import { Block, Fieldset } from 'shared/ui/components';
import { RequestData } from 'shared/api';
import { useToast } from 'app/providers/toast';
import { CATEGORY_TYPES } from 'shared/lib/category';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import {
	fetchCreateCategory,
	selectCategoryDataCreating,
	selectCategoryDataError,
} from 'entities/category/category-data';

export const CategoryCreateForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { showToast } = useToast();
	const isCreating = useAppSelector(selectCategoryDataCreating);
	const error = useAppSelector(selectCategoryDataError);

	const submitHandler = async (submittedData: RequestData) => {
		const newCategory = await dispatch(fetchCreateCategory(submittedData)).unwrap();

		showToast({ message: 'Категория создана', type: 'success' });
	};

	if (error) {
		showToast({ message: error, type: 'error' });
	}

	return (
		<Block className={css['block']}>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(categoryCreateFormRules)}>
				<Input type="text" name="name" label="Название категории" />
				<Fieldset label="Тип категории">
					<div className={css['radiobuttons']}>
						{CATEGORY_TYPES.map((type, i) => (
							<Radio key={type.id} name="type" value={type.id} label={type.name} defaultChecked={!i} />
						))}
					</div>
				</Fieldset>
				<Fieldset label="Иконка категории"></Fieldset>
				<Button type="submit" disabled={isCreating} loading={isCreating}>
					Создать категорию
				</Button>
			</Form>
		</Block>
	);
};
