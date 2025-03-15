import css from './print.module.scss';
import { useState } from 'react';
import { RequestData } from 'shared/api';
import { Form, Radio, Button as FormButton } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { printFormRules } from './print.rules';
import { Button, WarningPopup } from 'shared/ui/components';
import { useModal } from 'app/providers/modal';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from 'entities/patient/patient-data';
import { emailPatient, PatientPrintFormData, printPatient } from 'shared/api/patient';

interface PrintFormProps {
	onSuccess?: () => void;
	onReject?: () => void;
}

export const PrintForm = ({ onSuccess, onReject }: PrintFormProps) => {
	const { openModal, closeModal } = useModal();
	const [isLoading, setIsLoading] = useState(false);
	const patient = useAppSelector(selectPatientData);

	const submitHandler = async (data: RequestData) => {
		setIsLoading(true);

		const result = await printPatient(patient.visit_id, data as unknown as PatientPrintFormData);

		setIsLoading(false);

		if (result.status === 'ok') {
			openModal(
				<WarningPopup header="Отчёт отправлен на печать администратору" onOk={closeModal} noIcon={true} />,
			);
		} else {
			openModal(<WarningPopup header="Ошибка" text={result.message} onOk={closeModal} />);
		}
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Отправим результаты на печать администратору</h3>
			<p className={css['label']}>Выберите тип отчёта</p>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(printFormRules)}>
				<div className={css['radios']}>
					<Radio name="reportType" value="short" label="Краткий отчёт" />
					<Radio name="reportType" value="full" label="Полный отчёт" />
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
