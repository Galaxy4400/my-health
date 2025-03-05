import css from './card.module.scss';
import { useState } from 'react';
import { RequestData } from 'shared/api';
import { Form, Input, Radio, Button as FormButton } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { cardFormRules } from './card.rules';
import { Button } from 'shared/ui/components';

interface CardFormProps {
	onSuccess?: () => void;
	onReject?: () => void;
}

export const CardForm = ({ onSuccess, onReject }: CardFormProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const loginHandler = async ({ data }: RequestData) => {
		onSuccess?.();
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Отправить результаты в электронную медицинскую карту</h3>
			<p className={css['label']}>
				Укажите номер вашего полиса ОМС. Результаты будут добавлены в вашу электронную медицинскую карту.
			</p>
			<Form className={css['form']} onSubmit={loginHandler} resolver={yupResolver(cardFormRules)}>
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
