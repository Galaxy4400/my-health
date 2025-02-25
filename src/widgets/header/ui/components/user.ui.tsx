import css from './user.module.scss';
import { Link } from 'react-router-dom';
import { getAvatarPlug } from 'shared/utils';
import { path } from 'shared/lib/router';
import { useAuth } from 'app/providers/auth';

export const User = () => {
	const { authUser } = useAuth();

	if (!authUser) {
		throw new Error('You are not authenticated');
	}

	return (
		<Link className={css['user']} to={path.settings()}>
			<img className={css['avatar']} src={getAvatarPlug(authUser.login)} alt="avatar" />
			<span className={css['login']}>{authUser.login}</span>
		</Link>
	);
};
