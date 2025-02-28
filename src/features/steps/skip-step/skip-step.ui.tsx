import css from './skip-step.module.scss';
import { useNavigate } from 'react-router-dom';
import { useModal } from 'app/providers/modal';
import { Skip } from 'shared/ui/components';

export const SkipStep = ({ nextStep }: { nextStep: string }) => {
	const { openModal, closeModal } = useModal();
	const navigate = useNavigate();

	const clickHandler = () => {
		openModal(
			<Skip
				onConfirm={() => {
					navigate(nextStep);
					closeModal();
				}}
				onReject={closeModal}
			/>,
		);
	};

	return (
		<button className={css['btn']} onClick={clickHandler}>
			Пропустить шаг
		</button>
	);
};
