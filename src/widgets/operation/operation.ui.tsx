import { useEffect } from 'react';
import { OperationDelete } from 'features/operation';
import { useParams } from 'react-router-dom';
import { Loading } from 'shared/ui/components';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import {
	fetchGetOperationData,
	OperationView,
	selectOperationData,
	selectOperationDataId,
	selectOperationDataLoading,
} from 'entities/operation/operation-data';

export const Operation = () => {
	const { id } = useParams();
	const operation = useAppSelector(selectOperationData);
	const currentOperationId = useAppSelector(selectOperationDataId);
	const isLoading = useAppSelector(selectOperationDataLoading);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (id && id !== currentOperationId) dispatch(fetchGetOperationData(id));
	}, [currentOperationId, dispatch, id]);

	if (isLoading) {
		return <Loading />;
	}

	return <OperationView operation={operation} deleteSlot={<OperationDelete operationId={operation.id} />} />;
};
