import css from './participant-login.module.scss';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input } from 'shared/ui/form-components';
import { RequestData } from 'shared/api';
import { participantLoginFormRules } from './participant-login.rules';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';

export const ParticipantLogin = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const submitHandler = async (data: RequestData) => {
		setIsLoading(true);
		console.log(data);
		// const { error } = await registration(login as string, password as string);

		setIsLoading(false);

		// if (error) {
		// 	showToast({
		// 		message: error.includes('E11000') ? 'Такой пользователь уже существует' : error,
		// 		type: 'error',
		// 	});

		// 	return;
		// }

		// showToast({ message: 'Вы успешно зарегистрировались', type: 'success' });

		navigate(path.start());
	};

	return (
		<div className={css['main']}>
			<h5 className={css['title']}>
				Введите свой код пациента в поле ниже.
				<br />
				Он отображался на экране в конце предыдущего исследования
				<br />
				и отправлялся на email, если Вы его указывали.
				<br />
				Если у Вас нет кода пациента - нажмите сюда
			</h5>
			<Form
				className={css['form']}
				onSubmit={submitHandler}
				resolver={yupResolver(participantLoginFormRules)}
			>
				<div className={css['inputs']}>
					<div className={css['row']}>
						<div className={css['column']}>
							<h5 className={css['param']}>Ваш код пациента:</h5>
						</div>
						<div className={css['column']}>
							<Input name="code" required />
						</div>
					</div>
				</div>
				<div className={css['actions']}>
					<Button type="submit">Начать обследование</Button>
				</div>
			</Form>
		</div>
	);
};
