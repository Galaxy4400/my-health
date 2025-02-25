import css from './account-item.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { ReactNode } from 'react';
import { path } from 'shared/lib/router';
import { Icon } from 'shared/ui/icons';
import { priceFormat } from 'shared/utils';
import { AccountType } from 'shared/api/account';
import { getAccountTypeImage, getAccountTypeName } from 'shared/lib/account';

interface AccountItemProps {
	account: AccountType;
	deleteSlot: ReactNode;
}

export const AccountItem = ({ account, deleteSlot }: AccountItemProps) => {
	const location = useLocation();

	return (
		<div className={css['account']}>
			<Link className={css['main']} to={path.account.id(account.id)} state={{ from: location }}>
				<figure className={css['figure']}>
					<Icon className={css['icon']} name={getAccountTypeImage(account.type)} />
				</figure>
				<div className={css['info']}>
					<span className={css['amount']}>{priceFormat(account.amount)}</span>
					<span className={css['name']}>{getAccountTypeName(account.type)}</span>
				</div>
			</Link>
			<div className={css['delete']}>{deleteSlot}</div>
		</div>
	);
};
