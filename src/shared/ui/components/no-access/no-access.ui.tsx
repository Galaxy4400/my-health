import css from './no-access.module.scss';
import { Icon } from 'shared/ui/icons';
import { Icons } from 'shared/types';
import { Button } from '../button';

export const NoAccess = ({ onClick }: { onClick: () => void }) => {
	return (
		<div className={css['main']}>
			<h3 className={css['title']}>
				<span className={css['icon']}>
					<Icon name={Icons.lock} width={36} height={38} />
				</span>
				Доступ запрещен
			</h3>
			<Button onClick={onClick}>ОК</Button>
		</div>
	);
};
