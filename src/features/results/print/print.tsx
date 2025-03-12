import css from './print.module.scss';
import { useState } from 'react';
import { RequestData } from 'shared/api';
import { Form, Radio, Button as FormButton } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { printFormRules } from './print.rules';
import { Button } from 'shared/ui/components';
import { useModal } from 'app/providers/modal';

interface PrintFormProps {
	onSuccess?: () => void;
	onReject?: () => void;
}

export const PrintForm = ({ onSuccess, onReject }: PrintFormProps) => {
	const { openModal } = useModal();
	const [isLoading, setIsLoading] = useState(false);

	const loginHandler = async ({ data }: RequestData) => {
		onSuccess?.();

		openModal(
			<div style={{ padding: '60px 120px' }}>
				<h3>Отправлено на печать</h3>
			</div>,
		);
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Отправим результаты на печать администратору</h3>
			<p className={css['label']}>Выберите тип отчёта</p>
			<Form className={css['form']} onSubmit={loginHandler} resolver={yupResolver(printFormRules)}>
				<div className={css['radios']}>
					<Radio name="type" value="short" label="Краткий отчёт" />
					<Radio name="type" value="full" label="Полный отчёт" />
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
