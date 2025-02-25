import css from './category-delete.module.scss';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'shared/ui/icons';
import { useModal } from 'app/providers/modal';
import { Confirm } from 'shared/ui/components';
import { useToast } from 'app/providers/toast';
import { Icons, ID } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { fetchDeleteCategory, selectCategoryDataError } from 'entities/category/category-data';
import { path } from 'shared/lib/router';

interface CategoryDeleteProps {
	categoryId: ID;
}

export const CategoryDelete = ({ categoryId }: CategoryDeleteProps) => {
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { openModal, closeModal } = useModal();
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectCategoryDataError);

	const deleteCategory = async () => {
		await dispatch(fetchDeleteCategory(categoryId)).unwrap();

		showToast({ message: 'Счет удален', type: 'success' });

		navigate(path.home(), { replace: true });

		closeModal();
	};

	if (error) {
		showToast({ message: error, type: 'error' });
	}

	const deleteHandler = () => {
		openModal(
			<Confirm
				title="Хотите удалить категорию?"
				text="Все операции категории так же будут удалены!"
				onConfirm={deleteCategory}
				onReject={closeModal}
			/>,
		);
	};

	return (
		<button className={css['button']} type="button" onClick={deleteHandler}>
			<Icon className={css['icon']} name={Icons.cart}></Icon>
		</button>
	);
};
