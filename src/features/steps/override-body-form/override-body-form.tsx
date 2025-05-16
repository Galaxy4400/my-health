import css from './override-body-form.module.scss';
import { RequestData } from 'shared/api';
import { Form, Input, Button as FormButton } from 'shared/ui/form-components';
import { yupResolver } from '@hookform/resolvers/yup';
import { overrideBodyFormRules } from './override-body-form.rules';
import { Button } from 'shared/ui/components';
import { Override } from 'shared/api/patient';
import { useAppDispatch } from 'shared/lib/store';
import { setOverride } from 'entities/application';

interface OverrideBodyFormProps {
	onSuccess?: () => void;
}

export const OverrideBodyForm = ({ onSuccess }: OverrideBodyFormProps) => {
	const dispatch = useAppDispatch();

	const submitHandler = async (data: RequestData) => {
		dispatch(setOverride(data as Override));

		onSuccess?.();
	};

	return (
		<div className={css['main']}>
			<h3 className={css['title']}>Введите данные вручную</h3>
			<Form className={css['form']} onSubmit={submitHandler} resolver={yupResolver(overrideBodyFormRules)}>
				<div className={css['inputs']}>
					<div className={css['inputs-row']}>
						<span className={css['input-label']}>Рост:</span>
						<Input className={css['login']} type="text" name="height" dataType="number" />
					</div>
				</div>
				<div className={css['actions']}>
					<Button onClick={onSuccess} color="second" type="button">
						Отмена
					</Button>
					<FormButton type="submit">Отправить</FormButton>
				</div>
			</Form>
		</div>
	);
};
