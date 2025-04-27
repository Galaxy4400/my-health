import css from './override-cardio.module.scss';
import { useModal } from 'app/providers/modal';
import { OverrideCardioForm } from 'features/steps';

interface OverrideCardioProps {
	isComplete: boolean;
	onSuccess?: () => void;
	onReject?: () => void;
	onClick?: () => void;
}

export const OverrideCardio = ({ isComplete, onSuccess, onReject, onClick }: OverrideCardioProps) => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		openModal(
			<OverrideCardioForm
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
