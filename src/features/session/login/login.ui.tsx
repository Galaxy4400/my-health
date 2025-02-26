import css from './login.module.scss';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { loginFormRules } from './login.rules';
import { useAuth } from 'app/providers/auth';
import { Form, Input, Password } from 'shared/ui/form-components';
import { Button } from 'shared/ui/form-components';
import { RequestData } from 'shared/api';
import { useModal } from 'app/providers/modal';
import { NoAccess } from 'shared/ui/components';
import { path } from 'shared/lib/router';

interface LoginFormProps {
	navigate: NavigateFunction;
	onSuccess: () => void;
}

export const LoginForm = ({ navigate, onSuccess }: LoginFormProps) => {
	const [isLoading, setIsLoading] = useState(false);
	const { openModal, closeModal } = useModal();

	const { authorize } = useAuth();

	const loginHandler = async ({ login, password }: RequestData) => {
		setIsLoading(true);

		const { error } = await authorize(login as string, password as string);

		setIsLoading(false);

		if (error) {
			openModal(<NoAccess onClick={closeModal} />);

			return;
		}

		onSuccess();

		navigate(path.admin());
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Доступ администратора</h3>
			<Form className={css['form']} onSubmit={loginHandler} resolver={yupResolver(loginFormRules)}>
				<div className={css['inputs']}>
					<Input className={css['login']} type="text" name="login" placeholder="Логин" />
					<Password name="password" placeholder="Пароль" />
				</div>
				<Button type="submit" disabled={isLoading} loading={isLoading} width="big">
					Вход
				</Button>
			</Form>
		</div>
	);
};
