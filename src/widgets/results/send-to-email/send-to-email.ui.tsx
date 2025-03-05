import css from './send-to-email.module.scss';
import { useModal } from 'app/providers/modal';
import { Button } from 'shared/ui/components';
import { LoginForm } from 'features/session';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';

export const SendToEmail = () => {
	const { openModal, closeModal } = useModal();
	const navigate = useNavigate();

	const clickHandler = () => {
		openModal(<div></div>);
	};

	return (
		<Button className={css['btn']} color="second" onClick={clickHandler}>
			Отправить на email
		</Button>
	);
};
