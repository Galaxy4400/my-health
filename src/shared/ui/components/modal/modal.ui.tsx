import css from './modal.module.scss';
import { useClickAway } from '@uidotdev/usehooks';
import { Icon } from '../../icons';
import { Icons } from 'shared/types';
import { useModal, useModalState } from 'app/providers/modal';

export const Modal = () => {
	const { isOpen, content } = useModalState();
	const { closeModal } = useModal();
	const clickAwayRef = useClickAway<HTMLDivElement>(closeModal);

	return (
		<div className={`${css['modal']} ${isOpen ? 'active' : ''}`}>
			<div className={css['container']} ref={clickAwayRef}>
				{/* <button className={css['close']} onClick={closeModal}>
					<Icon className={css['icon']} name={Icons.cross} />
				</button> */}
				{content}
			</div>
		</div>
	);
};
