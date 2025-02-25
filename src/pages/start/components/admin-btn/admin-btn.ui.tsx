import css from './admin-btn.module.scss';
import { Icons } from 'shared/types';
import { useModal } from 'app/providers/modal';
import { IconItem } from 'shared/ui/components';

export const AdminBtn = () => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		openModal(<div>Форма</div>);
	};

	return (
		<div className={css['wrapper']}>
			<IconItem className={css['btn']} icon={Icons.lock} width={35} height={38} onClick={clickHandler}>
				Доступ администратора
			</IconItem>
		</div>
	);
};
