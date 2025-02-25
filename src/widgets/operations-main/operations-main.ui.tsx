/* eslint-disable no-unused-vars */
import css from './operations-main.module.scss';
import { Link } from 'react-router-dom';
import { Block, Loading } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { ReactNode, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { OperationType } from 'shared/api/operation';
import {
	fetchGetOperationList,
	selectOperationList,
	selectOperationListLimit,
	selectOperationListLoading,
} from 'entities/operation/operation-list';

interface OperationsMainProps {
	renderOperationList: (operations: OperationType[]) => ReactNode;
}

export const OperationsMain = ({ renderOperationList }: OperationsMainProps) => {
	const dispatch = useAppDispatch();
	const operations = useAppSelector(selectOperationList);
	const isLoading = useAppSelector(selectOperationListLoading);
	const limit = useAppSelector(selectOperationListLimit);

	useEffect(() => {
		dispatch(fetchGetOperationList({ limit }));
	}, [dispatch, limit]);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Block className={css['main']}>
			<h4 className={css['title']}>Недавние операции</h4>
			{renderOperationList(operations)}
			<Link className={css['more']} to={path.history()}>
				Просмотреть больше операций
			</Link>
		</Block>
	);
};
