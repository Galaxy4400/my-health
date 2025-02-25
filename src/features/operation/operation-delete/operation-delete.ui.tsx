import css from './operation-delete.module.scss';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { Icon } from 'shared/ui/icons';
import { useModal } from 'app/providers/modal';
import { Confirm } from 'shared/ui/components';
import { useToast } from 'app/providers/toast';
import { Icons, ID } from 'shared/types';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { fetchDeleteOperation, selectOperationDataError } from 'entities/operation/operation-data';
import { fetchGetOperationList } from 'entities/operation/operation-list';
import { OPERATIONS_PER_LOAD } from 'shared/constants';

interface OperationDeleteProps {
	operationId: ID;
}

export const OperationDelete = ({ operationId }: OperationDeleteProps) => {
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { openModal, closeModal } = useModal();
	const dispatch = useAppDispatch();
	const error = useAppSelector(selectOperationDataError);

	const deleteOperation = async () => {
		await dispatch(fetchDeleteOperation(operationId)).unwrap();
		await dispatch(fetchGetOperationList({ limit: OPERATIONS_PER_LOAD }));

		showToast({ message: 'Операция удалена', type: 'success' });

		navigate(path.home(), { replace: true });

		closeModal();
	};

	if (error) {
		showToast({ message: error, type: 'error' });
	}

	const deleteHandler = () => {
		openModal(<Confirm title="Хотите удалить операцию?" onConfirm={deleteOperation} onReject={closeModal} />);
	};

	return (
		<button className={css['button']} type="button" onClick={deleteHandler}>
			<Icon className={css['icon']} name={Icons.cart}></Icon>
		</button>
	);
};
