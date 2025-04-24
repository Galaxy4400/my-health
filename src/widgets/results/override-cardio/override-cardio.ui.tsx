import css from './override-cardio.module.scss';
import { useModal } from 'app/providers/modal';
import { OverrideCardioForm } from 'features/steps';

interface OverrideCardioProps {
	patientId: number;
	onSuccess?: () => void;
	onReject?: () => void;
	onClick?: () => void;
}

export const OverrideCardio = ({ patientId, onSuccess, onReject, onClick }: OverrideCardioProps) => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		onClick?.();

		openModal(
			<OverrideCardioForm
				patientId={patientId}
				onSuccess={() => {
					onSuccess?.();
					closeModal();
				}}
				onReject={() => {
					onReject?.();
					closeModal();
				}}
			/>,
		);
	};

	return (
		<button className={css['btn']} onClick={clickHandler}>
			Ввести вручную
		</button>
	);
};
