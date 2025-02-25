import css from './operation-create.module.scss';
import { useLocation, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { operationCreateFormRules } from './operation-create.rules';
import { path } from 'shared/lib/router';
import { Button, Form, Input, Select } from 'shared/ui/form-components';
import { Block } from 'shared/ui/components';
import { RequestData } from 'shared/api';
import { useToast } from 'app/providers/toast';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { LocationFromAccount } from 'shared/types/helpers';
import { buildSelectOptions } from 'shared/utils';
import { AccountType, getAccounts } from 'shared/api/account';
import { useEffect, useMemo, useState } from 'react';
import { CategoryType, getCategories } from 'shared/api/category';
import {
	fetchCreateOperation,
	selectOperationDataCreating,
	selectOperationDataError,
} from 'entities/operation/operation-data';

export const OperationCreateForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const [accounts, setAccounts] = useState<AccountType[]>([]);
	const [categories, setCategories] = useState<CategoryType[]>([]);
	const isCreating = useAppSelector(selectOperationDataCreating);
	const error = useAppSelector(selectOperationDataError);
	const location = useLocation() as LocationFromAccount;
	const { showToast } = useToast();

	const accountOptions = useMemo(() => buildSelectOptions(accounts, 'name', 'id'), [accounts]);
	const categoryOptions = useMemo(() => buildSelectOptions(categories, 'name', 'id'), [categories]);

	useEffect(() => {
		getAccounts().then(({ accounts }) => setAccounts(accounts ?? []));
		getCategories().then(({ categories }) => setCategories(categories ?? []));
	}, []);

	const submitHandler = async (submittedData: RequestData) => {
		const newOperation = await dispatch(fetchCreateOperation(submittedData)).unwrap();

		showToast({ message: 'Счет создан', type: 'success' });

		navigate(path.operation.id(newOperation.id), { replace: true });
	};

	if (error) {
		showToast({ message: error, type: 'error' });
	}

	return (
		<Block className={css['block']}>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(operationCreateFormRules)}>
				<Input type="number" name="amount" label="Сумма операции" />
				<Select
					name="account"
					options={accountOptions}
					defaultValue={location.state?.from.accountId || ''}
					label="Счет операции"
					placeholder=""
				/>
				<Select name="category" options={categoryOptions} label="Категория операции" placeholder="" />
				<Input type="text" name="comment" label="Комментарий" />
				<Button type="submit" disabled={isCreating} loading={isCreating}>
					Создать операцию
				</Button>
			</Form>
		</Block>
	);
};
