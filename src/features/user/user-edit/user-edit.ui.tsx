import css from './user-edit.module.scss';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { editUserFormRules } from './user-edit.rules';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router/path';
import { Button, Form, Input } from 'shared/ui/form-components';
import { Block } from 'shared/ui/components';
import { useToast } from 'app/providers/toast';
import { Nullable } from 'shared/types';
import { request, RequestData } from 'shared/api';
import { useAuth } from 'app/providers/auth';
import { UserResponse, UserType } from 'shared/api/user';

interface EditUserFormProps {
	userData: Nullable<UserType>;
}

export const EditUserForm = ({ userData }: EditUserFormProps) => {
	const navigate = useNavigate();
	const { showToast } = useToast();
	const { authCheck } = useAuth();
	const [isLoading, setIsLoading] = useState(false);

	const submitHandler = async (submittedData: Omit<RequestData, 'passcheck'>) => {
		setIsLoading(true);

		const { user, error } = await request<UserResponse>({
			url: `/users/${userData.id}`,
			method: 'PATCH',
			data: submittedData,
		});

		if (!user) {
			throw new Error(error || 'Unknown error');
		}

		authCheck();

		setIsLoading(false);

		navigate(path.home());

		showToast({ message: 'Изменения внесены', type: 'success' });
	};

	return (
		<Block className={css['block']}>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(editUserFormRules)}>
				<Input type="text" name="login" defaultValue={userData.login || ''} label="Логин" />
				<Input type="email" name="email" defaultValue={userData.email || ''} label="E-mail" />
				<Input type="text" name="name" defaultValue={userData.name || ''} label="Имя" />
				<Input type="text" name="surname" defaultValue={userData.surname || ''} label="Фамилия" />
				<Input type="text" name="address" defaultValue={userData.address || ''} label="Адрес" />
				<Input type="password" name="password" label="Пароль" />
				<Input type="password" name="passcheck" label="Повторите пароль" />
				<Button type="submit" disabled={isLoading} loading={isLoading}>
					Внести изменения
				</Button>
			</Form>
		</Block>
	);
};
