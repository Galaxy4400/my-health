import css from './override-body.module.scss';
import { useModal } from 'app/providers/modal';
import { OverrideBodyForm } from 'features/steps';

interface OverrideBodyProps {
	isComplete: boolean;
	onClick?: () => void;
}

export const OverrideBody = ({ isComplete, onClick }: OverrideBodyProps) => {
	const { openModal, closeModal } = useModal();

	const clickHandler = () => {
		openModal(
			<OverrideBodyForm
				onSuccess={() => {
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
