import css from './logout.module.scss';
import { useAuth } from 'app/providers/auth';
import { Icon } from 'shared/ui/icons';
import { useModal } from 'app/providers/modal';
import { Confirm } from 'shared/ui/components';
import { Icons } from 'shared/types';

export const LogoutButton = () => {
	const { logout } = useAuth();
	const { openModal, closeModal } = useModal();

	const logoutHandler = () => {
		openModal(
			<Confirm
				title="Хотите выйти?"
				onConfirm={async () => {
					logout();
					closeModal();
				}}
				onReject={closeModal}
			/>,
		);
	};

	return (
		<button className={css['button']} onClick={logoutHandler}>
			<Icon className={css['icon']} name={Icons.exit} />
		</button>
	);
};
