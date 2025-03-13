import css from './account-view.module.scss';
import { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { Icons } from 'shared/types';
import { DATETIME_FORMAT } from 'shared/constants';
import { Block } from 'shared/ui/components';

import { path } from 'shared/lib/router';
import { Icon } from 'shared/ui/icons';
import { AccountType } from 'shared/api/account';
import { getAccountType } from 'shared/lib/account';

interface AccountViewProps {
	account: AccountType;
	deleteSlot: ReactNode;
}

export const AccountView = ({ account, deleteSlot }: AccountViewProps) => {
	return (
		<Block className={css['view']}>
			<h4>Счет №{account.id}</h4>
			<dl>
				<div>
					<dt>Дата:</dt>
					<dd>{account.createdAt ? format(account.createdAt, DATETIME_FORMAT) : ''}</dd>
				</div>
				<div>
					<dt>Название:</dt>
					<dd>{account.name}</dd>
				</div>
				<div>
					<dt>Сумма:</dt>
					<dd>{priceFormat(account.amount)}</dd>
				</div>
				<div>
					<dt>Тип:</dt>
					<dd>{getAccountType(account.type)?.name}</dd>
				</div>
				<div>
					<dt>Комментарий:</dt>
					<dd>{account.comment}</dd>
				</div>
			</dl>
			<div className={css['actions']}>
				<Link className={css['edit-link']} to={path.account.edit(account.id)}>
					<Icon className={css['edit-icon']} name={Icons.edit} />
				</Link>
				{deleteSlot}
			</div>
		</Block>
	);
};
