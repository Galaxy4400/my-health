import css from './card.module.scss';
import { useState } from 'react';
import { RequestData } from 'shared/api';
import { Form, Input, Radio, Button as FormButton } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { cardFormRules } from './card.rules';
import { Button, Loader, WarningPopup } from 'shared/ui/components';
import { useModal } from 'app/providers/modal';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from 'entities/patient/patient-data';
import { cardPatient, PatientCardFormData } from 'shared/api/patient';

interface CardFormProps {
	onSuccess?: () => void;
	onReject?: () => void;
}

export const CardForm = ({ onSuccess, onReject }: CardFormProps) => {
	const { openModal, closeModal } = useModal();
	const [isLoading, setIsLoading] = useState(false);
	const patient = useAppSelector(selectPatientData);

	const submitHandler = async (data: RequestData) => {
		setIsLoading(true);

		const result = await cardPatient(patient.visit_id, data as unknown as PatientCardFormData);

		setIsLoading(false);

		if (result.status === 'ok') {
			openModal(
				<WarningPopup header="Данные отправлены в Вашу медицинскую карту" onOk={closeModal} noIcon={true} />,
			);
		} else {
			openModal(<WarningPopup header="Ошибка" text={result.message} onOk={closeModal} />);
		}
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Отправить результаты в электронную медицинскую карту</h3>
			<p className={css['label']}>
				Укажите номер вашего полиса ОМС. Результаты будут добавлены в вашу электронную медицинскую карту.
			</p>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(cardFormRules)}>
				<div className={css['inputs']}>
					<div className={css['inputs-row']}>
						<span className={css['input-label']}>Номер полиса ОМС:</span>
						<Input className={css['login']} type="text" name="code" />
					</div>
				</div>
				<div className={css['actions']}>
					<Button onClick={onReject} color="second" type="button">
						Отмена
					</Button>
					<FormButton type="submit">Отправить</FormButton>
				</div>
			</Form>
		</div>
	);
};
