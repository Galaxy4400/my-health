import css from './send.module.scss';
import { useState } from 'react';
import { RequestData } from 'shared/api';
import { Form, Input, Radio, Button as FormButton } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { sendFormRules } from './send.rules';
import { Button } from 'shared/ui/components';

interface SendFormProps {
	onSuccess?: () => void;
	onReject?: () => void;
}

export const SendForm = ({ onSuccess, onReject }: SendFormProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const loginHandler = async ({ data }: RequestData) => {
		onSuccess?.();
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Отправим результаты на email</h3>
			<p className={css['label']}>Выберите тип отчёта</p>
			<Form className={css['form']} onSubmit={loginHandler} resolver={yupResolver(sendFormRules)}>
				<div className={css['inputs']}>
					<div className={css['inputs-row']}>
						<span className={css['input-label']}>Ваш email:</span>
						<Input className={css['login']} type="email" name="email" />
					</div>
				</div>
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
