import css from './patient-nodata.module.scss';
import { useRef, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Form, FormRef, Input, Radio } from 'shared/ui/form-components';
import { patientNodataFormRules } from './patient-nodata.rules';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { Gender, PatientNodataData } from 'shared/api/patient';
import { RequestData } from 'shared/api';
import { useModal } from 'app/providers/modal';
import { WarningPopup } from 'shared/ui/components';
import { fetchPatientVisit } from 'entities/patient/patient-data';
import { selectApplicationDevices } from 'entities/application';

export const PatientNodata = () => {
	const navigate = useNavigate();
	const formRef = useRef<FormRef>(null);
	const dispatch = useAppDispatch();
	const { openModal, closeModal } = useModal();
	const devices = useAppSelector(selectApplicationDevices);
	const [gender, setGender] = useState<Gender | null>(null);

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

	const onChangeHandler = () => {
		const gender = formRef.current?.getValues()?.gender;

		setGender(gender);
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
				onChange={onChangeHandler}
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
					</div>
				</div>
				{devices.tape && (
					<div className={css['section']}>
						<p className={css['label']}>
							Если хотите получить более точные рекоммендации - возьмите прикреплённую <b>рулетку</b>,
							замерьте обхват своей <b>талии, бёдер</b> и <b>шеи</b> и введите результаты.
							<br />
							Если вы хотите получить максимально точные результаты и рекомендации - используйте
							<b>калипер</b> для измерения <b>толщины складок кожи</b> в трёх точках. <b>Обратите внимание</b>
							: точки разные для мужчин и женщин.
						</p>
						<div className={css['options']}>
							<div className={css['inputs']}>
								<h5 className={css['title']}>Замеры рулеткой:</h5>
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
								<div className={css['row']}>
									<div className={css['column']}>
										<h5 className={css['param']}>Охват шеи, см:</h5>
									</div>
									<div className={css['column']}>
										<div className={css['age-wrapper']}>
											<Input name="neck" dataType="number" />
										</div>
									</div>
								</div>
							</div>
							<div className={css['inputs']}>
								<h5 className={css['title']}>Замеры калипером:</h5>
								<div className={css['row']}>
									<div className={css['column']}>
										<h5 className={css['param']}>{gender === 'male' ? 'Грудь' : 'Трицепс'}, мм:</h5>
									</div>
									<div className={css['column']}>
										<div className={css['age-wrapper']}>
											<Input name="caliper1" dataType="number" />
										</div>
									</div>
								</div>
								<div className={css['row']}>
									<div className={css['column']}>
										<h5 className={css['param']}>
											{gender === 'male' ? 'Живот' : 'Бок над подвздошной костью'}, мм:
										</h5>
									</div>
									<div className={css['column']}>
										<div className={css['age-wrapper']}>
											<Input name="caliper2" dataType="number" />
										</div>
									</div>
								</div>
								<div className={css['row']}>
									<div className={css['column']}>
										<h5 className={css['param']}>{gender === 'male' ? 'Бедро' : 'Бедро'}, мм:</h5>
									</div>
									<div className={css['column']}>
										<div className={css['age-wrapper']}>
											<Input name="caliper3" dataType="number" />
										</div>
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
