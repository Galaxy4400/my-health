import css from './actions.module.scss';
import { LogoutButton } from 'features/session';
import { User } from './user.ui';

export const Actions = () => {
	return (
		<div className={css['actions']}>
			<User />
			<LogoutButton />
		</div>
	);
};
