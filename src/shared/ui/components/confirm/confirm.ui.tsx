import css from './confirm.module.scss';
import { Button } from '../button';
import { useState } from 'react';

interface ConfirmProps {
	title: string;
	text?: string;
	onConfirm: () => Promise<void>;
	onReject: () => void;
}

export const Confirm = ({ title, text, onConfirm, onReject }: ConfirmProps) => {
	const [isLoading, setIsLoading] = useState(false);

	const confirmHandler = async () => {
		setIsLoading(true);

		await onConfirm();

		setIsLoading(false);
	};

	return (
		<div className={css['container']}>
			<h3 className={css['title']}>{title}</h3>
			{!!text && <p>{text}</p>}
			<div className={css['actions']}>
				<Button className={css['reject']} onClick={onReject}>
					Отмена
				</Button>
				<Button className={css['confirm']} onClick={confirmHandler} loading={isLoading}>
					Подтвердить
				</Button>
			</div>
		</div>
	);
};
