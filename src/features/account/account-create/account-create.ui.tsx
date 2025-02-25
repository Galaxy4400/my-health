import css from './account-create.module.scss';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { accountCreateFormRules } from './account-create.rules';
import { path } from 'shared/lib/router';
import { Button, Form, Input, Radio, Textarea } from 'shared/ui/form-components';
import { Block, Fieldset } from 'shared/ui/components';
import { useToast } from 'app/providers/toast';
import { RequestData } from 'shared/api';
import { ACCOUNT_TYPES } from 'shared/lib/account';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import {
	fetchCreateAccount,
	selectAccountDataCreating,
	selectAccountDataError,
} from 'entities/account/account-data';

export const AccountCreateForm = () => {
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const { showToast } = useToast();
	const isCreating = useAppSelector(selectAccountDataCreating);
	const error = useAppSelector(selectAccountDataError);

	const submitHandler = async (submittedData: RequestData) => {
		const newAccount = await dispatch(fetchCreateAccount(submittedData)).unwrap();

		showToast({ message: 'Счет создан', type: 'success' });

		navigate(path.account.id(newAccount.id), { replace: true });
	};

	if (error) {
		showToast({ message: error, type: 'error' });
	}

	return (
		<Block className={css['block']}>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(accountCreateFormRules)}>
				<Input type="text" name="name" label="Название счета" />
				<Fieldset label="Тип счета">
					<div className={css['radiobuttons']}>
						{ACCOUNT_TYPES.map((type, i) => (
							<Radio key={type.id} name="type" value={type.id} label={type.name} defaultChecked={!i} />
						))}
					</div>
				</Fieldset>
				<Input type="number" name="amount" label="Сумма" />
				<Textarea name="comment" label="Комментарий" />
				<Button type="submit" disabled={isCreating} loading={isCreating}>
					Создать счет
				</Button>
			</Form>
		</Block>
	);
};
