import css from './operations-filter.module.scss';
import { Block, Loading } from 'shared/ui/components';
import { Button, DateRange, Form, PriceRange, Select } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { operationsFilterRules } from '../lib';
import { useEffect, useMemo, useState } from 'react';
import { AccountType, getAccounts } from 'shared/api/account';
import { CategoryType, getCategories } from 'shared/api/category';
import { buildSelectOptions } from 'shared/utils';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { QueryData } from 'shared/api';
import { useToast } from 'app/providers/toast';
import {
	fetchFilterOperationList,
	selectOperationListError,
	selectOperationListFiltering,
	selectOperationListLoading,
} from 'entities/operation/operation-list';

export const OperationsFilter = () => {
	const dispatch = useAppDispatch();
	const isLoading = useAppSelector(selectOperationListLoading);
	const isFiltering = useAppSelector(selectOperationListFiltering);
	const [accounts, setAccounts] = useState<AccountType[]>([]);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const error = useAppSelector(selectOperationListError);
	const { showToast } = useToast();

	const accountOptions = useMemo(() => buildSelectOptions(accounts, 'name', 'id'), [accounts]);
	const categoryOptions = useMemo(() => buildSelectOptions(categories, 'name', 'id'), [categories]);

	useEffect(() => {
		getAccounts().then(({ accounts }) => setAccounts(accounts ?? []));
		getCategories().then(({ categories }) => setCategories(categories ?? []));
	}, []);

	const filterHandler = async (filterParams: QueryData) => {
		await dispatch(fetchFilterOperationList(filterParams)).unwrap();
	};

	if (error) {
		showToast({ message: error, type: 'error' });
	}

	if (isLoading) {
		return <Loading />;
	}

	return (
		<Block className={css['block']}>
			<h4>Фильтр</h4>
			<Form className={css['form']} onSubmit={filterHandler} resolver={yupResolver(operationsFilterRules)}>
				<div className={css['section']}>
					<Select name="account" options={accountOptions} label="По счету" placeholder="" />
					<Select name="category" options={categoryOptions} label="По категории" placeholder="" />
					<DateRange name="daterange" label="По дате" />
					<PriceRange name="amountrange" label="По цене" />
				</div>
				<div className={css['actions']}>
					<Button
						className={css['reset']}
						type="button"
						isReset={true}
						isTrigger={true}
						loading={isFiltering}
					>
						Сбросить
					</Button>
					<Button type="submit" disabled={isFiltering} loading={isFiltering}>
						Применить
					</Button>
				</div>
			</Form>
		</Block>
	);
};
