import css from './account-delete.module.scss';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'shared/ui/icons';
import { useModal } from 'app/providers/modal';
import { Confirm } from 'shared/ui/components';
import { useToast } from 'app/providers/toast';
import { path } from 'shared/lib/router';
import { Icons, ID } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { fetchDeleteAccount, selectAccountDataError } from 'entities/account/account-data';
import { fetchGetOperationList } from 'entities/operation/operation-list';
import { OPERATIONS_PER_LOAD } from 'shared/constants';

interface AccountDeleteProps {
	accountId: ID;
}

export const AccountDelete = ({ accountId }: AccountDeleteProps) => {
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { openModal, closeModal } = useModal();
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectAccountDataError);

	const deleteAccount = async () => {
		await dispatch(fetchDeleteAccount(accountId)).unwrap();
		await dispatch(fetchGetOperationList({ limit: OPERATIONS_PER_LOAD }));

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
				title="Хотите удалить счет?"
				text="Все операции счета так же будут удалены!"
				onConfirm={deleteAccount}
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
