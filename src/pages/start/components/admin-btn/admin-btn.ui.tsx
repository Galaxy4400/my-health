import css from './admin-btn.module.scss';
import { Icons } from 'shared/types';
import { useModal } from 'app/providers/modal';
import { IconItem } from 'shared/ui/components';
import { LoginForm } from 'features/session';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'app/providers/auth';
import { path } from 'shared/lib/router';

export const AdminBtn = () => {
	const { authUser } = useAuth();
	const { openModal, closeModal } = useModal();
	const navigate = useNavigate();

	const clickHandler = () => {
		if (authUser) {
			navigate(path.admin());
			return;
		}

		openModal(
			<LoginForm
				onSuccess={() => {
					closeModal();
					navigate(path.admin());
				}}
			/>,
		);
	};

	return (
		<IconItem className={css['btn']} icon={Icons.lock} width={35} height={38} onClick={clickHandler}>
			Доступ администратора
		</IconItem>
	);
};
