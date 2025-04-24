import css from './override-puls-form.module.scss';
import { useState } from 'react';
import { RequestData } from 'shared/api';
import { Form, Input, Button as FormButton } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { overridePulsFormRules } from './override-puls-form.rules';
import { Button, Loader } from 'shared/ui/components';
import { Override } from 'shared/api/patient';
import { useMeasure } from 'shared/hooks';

interface OverridePulsFormProps {
	patientId: number;
	onSuccess?: () => void;
	onReject?: () => void;
}

export const OverridePulsForm = ({ patientId, onSuccess, onReject }: OverridePulsFormProps) => {
	const { startMeasure } = useMeasure();
	const [isLoading, setIsLoading] = useState(false);

	const submitHandler = async (data: RequestData) => {
		setIsLoading(true);

		const result = await startMeasure(2, patientId, data as unknown as Override);

		setIsLoading(false);

		if (result.status === 'ok') {
			console.log('success');
			onSuccess?.();
		} else {
			console.log('test');
			onReject?.();
		}
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Введите данные вручную</h3>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(overridePulsFormRules)}>
				<div className={css['inputs']}>
					<div className={css['inputs-row']}>
						<span className={css['input-label']}>Насыщение крови кислородом:</span>
						<Input className={css['login']} type="text" name="spo2" dataType="number" />
					</div>
					<div className={css['inputs-row']}>
						<span className={css['input-label']}>Пульс:</span>
						<Input className={css['login']} type="text" name="heartrate" dataType="number" />
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
