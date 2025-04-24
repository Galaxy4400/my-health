import { useModal } from 'app/providers/modal';
import css from './override-puls.module.scss';
import { OverridePulsForm } from 'features/steps';

interface OverridePulsProps {
	patientId: number;
	onSuccess?: () => void;
	onReject?: () => void;
	onClick?: () => void;
}

export const OverridePuls = ({ patientId, onSuccess, onReject, onClick }: OverridePulsProps) => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		onClick?.();

		openModal(
			<OverridePulsForm
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
