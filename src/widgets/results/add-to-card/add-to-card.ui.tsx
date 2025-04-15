import css from './add-to-card.module.scss';
import { useModal } from 'app/providers/modal';
import { CardForm } from 'features/results';
import { Button } from 'shared/ui/components';

export const AddToCard = ({ patientId }: { patientId: number }) => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		openModal(<CardForm patientId={patientId} onReject={closeModal} />);
	};

	return (
		<Button className={css['btn']} color="second" onClick={clickHandler}>
			Добавить в мед. карту
		</Button>
	);
};
