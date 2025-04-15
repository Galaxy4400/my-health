import css from './print.module.scss';
import { useModal } from 'app/providers/modal';
import { Button } from 'shared/ui/components';
import { PrintForm } from 'features/results';

export const Print = ({ patientId }: { patientId: number }) => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		openModal(<PrintForm patientId={patientId} onReject={closeModal} />);
	};

	return (
		<Button className={css['btn']} color="second" onClick={clickHandler}>
			Распечатать
		</Button>
	);
};
