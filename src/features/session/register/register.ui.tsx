import css from './register.module.scss';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { registerFormRules } from './register.rules';
import { useAuth } from 'app/providers/auth';
import { Button, Form, Input } from 'shared/ui/form-components';
import { Link } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { useToast } from 'app/providers/toast';
import { RequestData } from 'shared/api';

export const RegisterForm = () => {
	const { registration } = useAuth();
	const [isLoading, setIsLoading] = useState(false);
	const { showToast } = useToast();

	const submitHandler = async ({ login, password }: RequestData) => {
		setIsLoading(true);

		const { error } = await registration(login as string, password as string);

		setIsLoading(false);

		if (error) {
			showToast({
				message: error.includes('E11000') ? 'Такой пользователь уже существует' : error,
				type: 'error',
			});

			return;
		}

		showToast({ message: 'Вы успешно зарегистрировались', type: 'success' });
	};

	return (
		<Block className={css['block']}>
			<h1 className={css['title']}>Регистрация</h1>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(registerFormRules)}>
				<Input type="text" name="login" label="Логин" />
				<Input type="password" name="password" label="Пароль" />
				<Input type="password" name="passcheck" label="Повторите пароль" />
				<Button type="submit" disabled={isLoading} loading={isLoading}>
					Зарегистрироваться
				</Button>
			</Form>
			<Link className={css['link']} to={path.login()}>
				Авторизация
			</Link>
		</Block>
	);
};
