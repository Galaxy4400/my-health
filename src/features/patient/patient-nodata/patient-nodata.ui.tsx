import css from './patient-nodata.module.scss';
import { useRef } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, Input, Radio } from 'shared/ui/form-components';
import { patientNodataFormRules } from './patient-nodata.rules';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { PatientNodataData } from 'shared/api/patient';
import { RequestData } from 'shared/api';
import { useModal } from 'app/providers/modal';
import { WarningPopup } from 'shared/ui/components';
import { fetchPatientVisit } from 'entities/patient/patient-data';
import { selectApplicationDevices } from 'entities/application';

export const PatientNodata = () => {
	const navigate = useNavigate();
	const formRef = useRef<HTMLFormElement | null>(null);
	const dispatch = useAppDispatch();
	const { openModal, closeModal } = useModal();
	const devices = useAppSelector(selectApplicationDevices);

	const submitHandler = async (data: RequestData) => {
		try {
			await dispatch(fetchPatientVisit(data as unknown as PatientNodataData)).unwrap();

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

	return (
		<div className={css['main']}>
			<p className={css['label']}>
				Укажите, пожалуйста, <b>Ваш пол и возраст</b> - это нужно для диагностики.
			</p>
			<Form
				className={css['form']}
				onSubmit={submitHandler}
				resolver={yupResolver(patientNodataFormRules)}
				context={{ hasHeight: !devices.heightMeter }}
				ref={formRef}
			>
				<div className={css['section']}>
					<div className={css['inputs']}>
						<div className={css['row']}>
							<div className={css['column']}>
								<h5 className={css['param']}>
									Идентификатор пациента <br />
									(не обязательно):
								</h5>
							</div>
							<div className={css['column']}>
								<div className={css['age-wrapper']}>
									<Input name="visitorId" dataType="number" />
								</div>
							</div>
						</div>
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
									<Input name="age" dataType="number" />
								</div>
							</div>
						</div>
						{!devices.heightMeter && (
							<div className={css['row']}>
								<div className={css['column']}>
									<h5 className={css['param']}>Ваш рост (см):</h5>
								</div>
								<div className={css['column']}>
									<div className={css['age-wrapper']}>
										<Input name="height" dataType="number" />
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{devices.tape && (
					<div className={css['section']}>
						<p className={css['label']}>
							Если хотите получить более точные рекоммендации - возьмите прикреплённую рулетку, замерьте
							обхват своей <b>талии</b> и <b>бёдер</b> и введите результаты:
						</p>
						<div className={css['inputs']}>
							<div className={css['row']}>
								<div className={css['column']}>
									<h5 className={css['param']}>Охват талии, см:</h5>
								</div>
								<div className={css['column']}>
									<div className={css['age-wrapper']}>
										<Input name="waist" dataType="number" />
									</div>
								</div>
							</div>
							<div className={css['row']}>
								<div className={css['column']}>
									<h5 className={css['param']}>Охват бёдер, см:</h5>
								</div>
								<div className={css['column']}>
									<div className={css['age-wrapper']}>
										<Input name="hips" dataType="number" />
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
				<div className={css['actions']}>
					<Button type="submit">Начать обследование</Button>
				</div>
			</Form>
		</div>
	);
};
