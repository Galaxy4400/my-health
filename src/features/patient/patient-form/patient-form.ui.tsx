import css from './patient-form.module.scss';
import { ChangeEvent, useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Radio, RadioComponent } from 'shared/ui/form-components';
import { RequestData } from 'shared/api';
import { patientFormRules } from './patient-form.rules';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';
import cn from 'classnames';

export const PatientForm = () => {
	const [isLoading, setIsLoading] = useState(false);
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement | null>(null);

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

	const changeHandler = () => {
		if (!formRef.current) return;

		const formData = new FormData(formRef.current);

		const data = Object.fromEntries(formData.entries());

		console.log(data);
	};

	return (
		<div className={css['main']}>
			<p className={css['label']}>
				Укажите, пожалуйста, <b>Ваш пол и возраст</b> - это нужно для диагностики.
			</p>
			<Form
				className={css['form']}
				onSubmit={submitHandler}
				resolver={yupResolver(patientFormRules)}
				onChange={changeHandler}
				ref={formRef}
			>
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
				<div className={css['test']}>
					<p className={css['label']}>
						Укажите, пожалуйста, есть ли у Вас какие-либо из перечисленных состояний:
					</p>
					<div className={css['questions']}>
						<div className={css['question-row']}>
							<div className={css['question']}>Заболевания сердечно-сосудистой системы</div>
							<div className={css['question-values']}>
								<RadioComponent name="q1" value="yes">
									<div className={css['question-value']}>Да</div>
								</RadioComponent>
								<RadioComponent name="q1" value="no">
									<div className={cn(css['question-value'], 'no')}>Нет</div>
								</RadioComponent>
							</div>
						</div>
						<div className={css['question-row']}>
							<div className={css['question']}>Заболевания дыхательной системы</div>
							<div className={css['question-values']}>
								<RadioComponent name="q2" value="yes">
									<div className={css['question-value']}>Да</div>
								</RadioComponent>
								<RadioComponent name="q2" value="no">
									<div className={cn(css['question-value'], 'no')}>Нет</div>
								</RadioComponent>
							</div>
						</div>
						<div className={css['question-row']}>
							<div className={css['question']}>Диабет</div>
							<div className={css['question-values']}>
								<RadioComponent name="q3" value="yes">
									<div className={css['question-value']}>Да</div>
								</RadioComponent>
								<RadioComponent name="q3" value="no">
									<div className={cn(css['question-value'], 'no')}>Нет</div>
								</RadioComponent>
							</div>
						</div>
						<div className={css['question-row']}>
							<div className={css['question']}>Беременность</div>
							<div className={css['question-values']}>
								<RadioComponent name="q4" value="yes">
									<div className={css['question-value']}>Да</div>
								</RadioComponent>
								<RadioComponent name="q4" value="no">
									<div className={cn(css['question-value'], 'no')}>Нет</div>
								</RadioComponent>
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
