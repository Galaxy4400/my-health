import { useModal } from 'app/providers/modal';
import css from './override-puls.module.scss';
import { OverridePulsForm } from 'features/steps';

interface OverridePulsProps {
	isComplete: boolean;
	onSuccess?: () => void;
	onReject?: () => void;
	onClick?: () => void;
}

export const OverridePuls = ({ isComplete, onSuccess, onReject, onClick }: OverridePulsProps) => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		openModal(
			<OverridePulsForm
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
		<button className={css['btn']} onClick={() => (isComplete ? onClick?.() : clickHandler())}>
			{isComplete ? 'Повторить измерение' : 'Ввести вручную'}
		</button>
	);
};
