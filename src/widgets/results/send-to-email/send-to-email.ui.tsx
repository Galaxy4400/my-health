import css from './send-to-email.module.scss';
import { useModal } from 'app/providers/modal';
import { Button } from 'shared/ui/components';
import { SendForm } from 'features/results';

export const SendToEmail = () => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		openModal(<SendForm onReject={closeModal} />);
	};

	return (
		<Button className={css['btn']} color="second" onClick={clickHandler}>
			Отправить на email
		</Button>
	);
};
