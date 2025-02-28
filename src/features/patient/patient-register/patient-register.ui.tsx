import css from './patient-register.module.scss';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, DatePicker, Form, Input, Radio } from 'shared/ui/form-components';
import { RequestData } from 'shared/api';
import { patientRegisterFormRules } from './patient-register.rules';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';

export const PatientRegister = () => {
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

		navigate(path.measure());
	};

	return (
		<div className={css['main']}>
			<h5 className={css['title']}>
				После обследования у Вас будет код пациента
				<br />
				(Вы увидите его на экране и получите на email).
				<br />
				По нему Вы сможете идентифицироваться при следующих обследованиях.
				<br />
				Если у Вас уже есть код - нажмите сюда
			</h5>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(patientRegisterFormRules)}>
				<div className={css['inputs']}>
					<div className={css['row']}>
						<div className={css['column']}>
							<h5 className={css['param']}>Вы:</h5>
						</div>
						<div className={css['column']}>
							<div className={css['radios']}>
								<Radio label="Мужчина" name="sex" value="X" />
								<Radio label="Женщина" name="sex" value="Y" />
							</div>
						</div>
					</div>
					<div className={css['row']}>
						<div className={css['column']}>
							<h5 className={css['param']}>Фамилия:</h5>
						</div>
						<div className={css['column']}>
							<Input name="lastname" />
						</div>
					</div>
					<div className={css['row']}>
						<div className={css['column']}>
							<h5 className={css['param']}>Имя:</h5>
						</div>
						<div className={css['column']}>
							<Input name="name" />
						</div>
					</div>
					<div className={css['row']}>
						<div className={css['column']}>
							<h5 className={css['param']}>Отчество:</h5>
						</div>
						<div className={css['column']}>
							<Input name="secondname" />
						</div>
					</div>
					<div className={css['row']}>
						<div className={css['column']}>
							<h5 className={css['param']}>Дата рождения:</h5>
						</div>
						<div className={css['column']}>
							<div className={css['datepicker-wrapper']}>
								<DatePicker name="birthday" />
							</div>
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
