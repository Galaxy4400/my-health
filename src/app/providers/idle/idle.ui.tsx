import css from './idle.module.scss';
import { BtnWithProgress, Button } from 'shared/ui/components';

interface IdlePopupProps {
	secLeft: number;
	totalSeconds: number;
	onClick: () => void;
}

export const IdlePopup = ({ secLeft, totalSeconds, onClick }: IdlePopupProps) => {
	return (
		<div className={css['main']}>
			<h2>Хотите продолжить работу?</h2>
			<BtnWithProgress
				className={css['timer']}
				text={String(secLeft)}
				onClick={onClick}
				curValue={secLeft}
				totalValue={totalSeconds}
			/>
			<Button onClick={onClick}>Продолжить</Button>
		</div>
	);
};
