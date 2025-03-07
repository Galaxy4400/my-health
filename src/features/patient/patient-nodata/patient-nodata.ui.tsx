import css from './patient-nodata.module.scss';
import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Radio } from 'shared/ui/form-components';
import { RequestData } from 'shared/api';
import { patientNodataFormRules } from './patient-nodata.rules';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';

export const PatientNodata = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();

	const submitHandler = async (data: RequestData) => {
		setIsLoading(true);

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
			<p className={css['label']}>Никаких проблем!</p>
			<p className={css['label']}>
				Только укажите, пожалуйста, <span>Ваш пол и возраст</span> - это нужно для диагностики.
			</p>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(patientNodataFormRules)}>
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
							<h5 className={css['param']}>Ваш возраст (полных лет):</h5>
						</div>
						<div className={css['column']}>
							<div className={css['age-wrapper']}>
								<Input name="age" />
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
