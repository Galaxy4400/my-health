import css from './login.module.scss';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { loginFormRules } from './login.rules';
import { useAuth } from 'app/providers/auth';
import { Form, Input } from 'shared/ui/form-components';
import { Block } from 'shared/ui/components';
import { useFrom } from 'shared/lib/location';
import { path } from 'shared/lib/router';
import { Button } from 'shared/ui/form-components';
import { useToast } from 'app/providers/toast';
import { RequestData } from 'shared/api';

export const LoginForm = () => {
	const navigate = useNavigate();
	const from = useFrom();
	const { showToast } = useToast();
	const [isLoading, setIsLoading] = useState(false);

	const { authorize } = useAuth();

	const loginHandler = async ({ login, password }: RequestData) => {
		setIsLoading(true);

		const { error } = await authorize(login as string, password as string);

		setIsLoading(false);

		if (error) {
			showToast({ message: error, type: 'error' });

			return;
		}

		navigate(from?.pathname || path.home());

		showToast({ message: 'Вы успешно вошли в систему', type: 'success' });
	};

	return (
		<Block className={css['block']}>
			<h1 className={css['title']}>Авторизация</h1>
			<Form className={css['form']} onSubmit={loginHandler} resolver={yupResolver(loginFormRules)}>
				<Input type="text" name="login" label="Логин" />
				<Input type="password" name="password" label="Пароль" />
				<Button type="submit" disabled={isLoading} loading={isLoading}>
					Войти
				</Button>
			</Form>
			<Link className={css['link']} to={path.register()}>
				Регистрация
			</Link>
		</Block>
	);
};
