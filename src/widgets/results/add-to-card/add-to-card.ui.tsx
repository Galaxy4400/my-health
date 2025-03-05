import css from './add-to-card.module.scss';
import { useModal } from 'app/providers/modal';
import { CardForm } from 'features/results';
import { Button } from 'shared/ui/components';

export const AddToCard = () => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		openModal(<CardForm onSuccess={closeModal} onReject={closeModal} />);
	};

	return (
		<Button className={css['btn']} color="second" onClick={clickHandler}>
			Добавить в мед. карту
		</Button>
	);
};
