import css from './operations-section.module.scss';
import { Link } from 'react-router-dom';
import { Block, Loading } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { AccountType } from 'shared/api/account';
import { useEffect } from 'react';
import { OperationsList } from './operations-list.ui';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { OPERATIONS_PER_LOAD } from 'shared/constants';
import { OperationsPagination } from 'features/operation/operation-pagination';
import { ID } from 'shared/types';
import {
	fetchGetOperationList,
	selectOperationList,
	selectOperationListLoading,
} from 'entities/operation/operation-list';

interface OperationsSectionProps {
	account?: AccountType;
	history?: boolean;
}

export const OperationsSection = ({ account, history }: OperationsSectionProps) => {
	const dispatch = useAppDispatch();
	const operations = useAppSelector(selectOperationList);
	const isLoading = useAppSelector(selectOperationListLoading);

	useEffect(() => {
		if (!account?.id && !history) return;

		dispatch(
			fetchGetOperationList({
				...(account ? { account: account.id } : {}),
				limit: OPERATIONS_PER_LOAD,
			}),
		);
	}, [account, dispatch, history]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Block className={css['block']}>
			<header className={css['header']}>
				<h4>Список операций</h4>
				<Link
					className={css['link']}
					to={path.operation.create()}
					state={{ from: { accountId: account?.id } }}
				>
					Создать операцию
				</Link>
			</header>
			<OperationsList operations={operations} />
			<OperationsPagination accountId={account?.id as ID} />
		</Block>
	);
};
