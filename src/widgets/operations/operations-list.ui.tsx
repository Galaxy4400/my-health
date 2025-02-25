import css from './operations-list.module.scss';
import { OperationDelete } from 'features/operation';
import { OperationItem } from 'entities/operation/operation-data';
import { OperationType } from 'shared/api/operation';

interface OperationsListProps {
	operations: OperationType[];
}

export const OperationsList = ({ operations }: OperationsListProps) => {
	return (
		<div className={css['list']}>
			{operations.length ? (
				operations?.map((operation) => (
					<OperationItem
						key={operation.id}
						operation={operation}
						deleteSlot={<OperationDelete operationId={operation.id} />}
					/>
				))
			) : (
				<h5>Операций нет</h5>
			)}
		</div>
	);
};
