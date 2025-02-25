import css from './accounts-main.module.scss';
import { useEffect } from 'react';
import { AccountDelete } from 'features/account';
import { Block, Loading } from 'shared/ui/components';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import {
	AccountItem,
	fetchGetAccountList,
	selectAccountList,
	selectAccountListLoading,
} from 'entities/account/account-list';

export const AccountsMain = () => {
	const dispatch = useAppDispatch();
	const accounts = useAppSelector(selectAccountList);
	const isLoading = useAppSelector(selectAccountListLoading);

	useEffect(() => {
		dispatch(fetchGetAccountList());
	}, [dispatch]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Block className={css['main']}>
			<h4 className={css['title']}>Список счетов</h4>
			<div className={css['list']}>
				{accounts?.map((account) => (
					<AccountItem
						key={account.id}
						account={account}
						deleteSlot={<AccountDelete accountId={account.id} />}
					/>
				))}
			</div>
		</Block>
	);
};
