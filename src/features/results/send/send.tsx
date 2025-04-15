import css from './send.module.scss';
import { useState } from 'react';
import { RequestData } from 'shared/api';
import { Form, Input, Radio, Button as FormButton } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendFormRules } from './send.rules';
import { Button, Loader, WarningPopup } from 'shared/ui/components';
import { useModal } from 'app/providers/modal';
import { patientEmailRequest, PatientSendFormData } from 'shared/api/patient';

interface SendFormProps {
	patientId: number;
	onReject?: () => void;
}

export const SendForm = ({ patientId, onReject }: SendFormProps) => {
	const { openModal, closeModal } = useModal();
	const [isLoading, setIsLoading] = useState(false);

	const submitHandler = async (data: RequestData) => {
		setIsLoading(true);

		const result = await patientEmailRequest(patientId, data as unknown as PatientSendFormData);

		setIsLoading(false);

		if (result.status === 'ok') {
			openModal(<WarningPopup header="Письмо отправлено" onOk={closeModal} noIcon={true} />);
		} else {
			openModal(<WarningPopup header="Ошибка" text={result.message} onOk={closeModal} />);
		}
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Отправим результаты на email</h3>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(sendFormRules)}>
				<div className={css['inputs']}>
					<div className={css['inputs-row']}>
						<span className={css['input-label']}>Ваш email:</span>
						<Input className={css['login']} type="text" name="email" dataType="email" />
					</div>
					<div className={css['radios-block']}>
						<p className={css['label']}>Выберите тип отчёта:</p>
						<div className={css['radios']}>
							<Radio name="reportType" value="short" label="Краткий отчёт" />
							<Radio name="reportType" value="full" label="Полный отчёт" />
						</div>
					</div>
				</div>
				<div className={css['actions']}>
					<Button onClick={onReject} color="second" type="button">
						Отмена
					</Button>
					<FormButton type="submit">Отправить</FormButton>
				</div>
			</Form>
			{isLoading && (
				<div className={css['loader-wrapper']}>
					<Loader className={css['loader']} isLoading={isLoading} />
				</div>
			)}
		</div>
	);
};
