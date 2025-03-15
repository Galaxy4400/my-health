import css from './patient-form.module.scss';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Radio, RadioComponent } from 'shared/ui/form-components';
import { patientFormRules } from './patient-form.rules';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { Icon } from 'shared/ui/icons';
import { Icons } from 'shared/types';
import { useAppDispatch } from 'shared/lib/store';
import { PatientRequestFormData } from 'shared/api/patient';
import cn from 'classnames';
import { RequestData } from 'shared/api';
import { useModal } from 'app/providers/modal';
import { WarningPopup } from 'shared/ui/components';
import { fetchPatientVisit } from 'entities/patient/patient-data';

export const PatientForm = () => {
	const [hasYes, setHasYes] = useState(false);
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement | null>(null);
	const dispatch = useAppDispatch();
	const { openModal, closeModal } = useModal();

	const submitHandler = async (data: RequestData) => {
		try {
			await dispatch(fetchPatientVisit(data as unknown as PatientRequestFormData)).unwrap();

			navigate(path.body());
		} catch (error) {
			openModal(
				<WarningPopup
					header="Не заполнены необходимые данные"
					text="Вернитесь и попробуйте ещё раз"
					onOk={closeModal}
				/>,
			);
			console.log(error);
		}
	};

	const changeHandler = () => {
		if (!formRef.current) return;

		const formData = new FormData(formRef.current);

		const data = Object.fromEntries(formData.entries());

		const hasYes = ['heart', 'breathing', 'diabetes', 'pregnacy'].some((key) => data[key] === 'yes');

		setHasYes(hasYes);
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
								<Radio label="Мужчина" name="gender" value="male" />
								<Radio label="Женщина" name="gender" value="female" />
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
								<RadioComponent name="heart" value="yes">
									<div className={css['question-value']}>Да</div>
								</RadioComponent>
								<RadioComponent name="heart" value="no">
									<div className={cn(css['question-value'], 'no')}>Нет</div>
								</RadioComponent>
							</div>
						</div>
						<div className={css['question-row']}>
							<div className={css['question']}>Заболевания дыхательной системы</div>
							<div className={css['question-values']}>
								<RadioComponent name="breathing" value="yes">
									<div className={css['question-value']}>Да</div>
								</RadioComponent>
								<RadioComponent name="breathing" value="no">
									<div className={cn(css['question-value'], 'no')}>Нет</div>
								</RadioComponent>
							</div>
						</div>
						<div className={css['question-row']}>
							<div className={css['question']}>Диабет</div>
							<div className={css['question-values']}>
								<RadioComponent name="diabetes" value="yes">
									<div className={css['question-value']}>Да</div>
								</RadioComponent>
								<RadioComponent name="diabetes" value="no">
									<div className={cn(css['question-value'], 'no')}>Нет</div>
								</RadioComponent>
							</div>
						</div>
						<div className={css['question-row']}>
							<div className={css['question']}>Беременность</div>
							<div className={css['question-values']}>
								<RadioComponent name="pregnacy" value="yes">
									<div className={css['question-value']}>Да</div>
								</RadioComponent>
								<RadioComponent name="pregnacy" value="no">
									<div className={cn(css['question-value'], 'no')}>Нет</div>
								</RadioComponent>
							</div>
						</div>
					</div>
				</div>
				<div className={css['actions']}>
					<Button type="submit">Начать обследование</Button>
				</div>
				{hasYes && (
					<div className={css['allert']}>
						<div className={css['allert-icon']}>
							<Icon name={Icons.exclam} />
						</div>
						<p className={css['allert-text']}>
							Результаты исследования носят рекомендательный характер. Необходимо проконсультироваться со
							специалистом по поводу рекомендаций, которые будут выданы после исследования.
						</p>
					</div>
				)}
			</Form>
		</div>
	);
};
