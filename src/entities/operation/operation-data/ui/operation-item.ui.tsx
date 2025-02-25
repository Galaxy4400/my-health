import css from './operation-item.module.scss';
import cn from 'classnames';
import { Link, useLocation } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { Icon, IconCategory } from 'shared/ui/icons';
import { priceFormat } from 'shared/utils';
import { format } from 'date-fns';
import { DATETIME_FORMAT } from 'shared/constants/datetime-format';
import { Icons } from 'shared/types';
import { ReactNode } from 'react';
import { OperationType } from 'shared/api/operation';
import { CategoryType } from 'shared/lib/category';

interface OperationItemProps {
	operation: OperationType;
	deleteSlot: ReactNode;
}

export const OperationItem = ({ operation, deleteSlot }: OperationItemProps) => {
	const location = useLocation();

	const amountTypeClass = operation.category?.type === CategoryType.income ? 'income' : 'expense';

	return (
		<div className={css['operation']}>
			<Link className={css['main']} to={path.operation.id(operation.id)} state={{ from: location }}>
				<figure className={css['figure']}>
					{operation.status ? (
						<IconCategory className={css['icon']} name={operation.category?.icon ?? undefined} />
					) : (
						<Icon className={css['abort-icon']} name={Icons.abort} />
					)}
				</figure>
				<div className={css['info']}>
					<span>{operation.category?.name}</span>
					<span className={css['datetime']}>
						{operation.createdAt ? format(operation.createdAt, DATETIME_FORMAT) : ''}
					</span>
					<span className={cn(css['amount'], amountTypeClass)}>{priceFormat(operation.amount)}</span>
					<span>Счет: {operation.account?.name}</span>
				</div>
			</Link>
			<div className={css['delete']}>{deleteSlot}</div>
		</div>
	);
};
