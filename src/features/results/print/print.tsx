import css from './print.module.scss';
import { useState } from 'react';
import { RequestData } from 'shared/api';
import { Form, Radio, Button as FormButton } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { printFormRules } from './print.rules';
import { Button } from 'shared/ui/components';

interface PrintFormProps {
	onSuccess?: () => void;
	onReject?: () => void;
}

export const PrintForm = ({ onSuccess, onReject }: PrintFormProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const loginHandler = async ({ data }: RequestData) => {
		onSuccess?.();
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Отправим результаты на email</h3>
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
