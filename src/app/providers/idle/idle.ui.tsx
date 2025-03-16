import { useEffect, useState } from 'react';
import css from './idle.module.scss';
import { BtnWithProgress } from 'shared/ui/components';

interface IdlePopupProps {
	totalSeconds: number;
	onClick: () => void;
}

export const IdlePopup = ({ totalSeconds, onClick }: IdlePopupProps) => {
	const [progress, setProgress] = useState(totalSeconds * 1000);

	useEffect(() => {
		const intervar = setInterval(() => {
			setProgress((prev) => prev - 10);
		}, 10);

		return () => clearInterval(intervar);
	}, []);

	return (
		<div className={css['main']}>
			<h2>Хотите продолжить работу?</h2>
			<BtnWithProgress
				className={css['timer']}
				text="Продолжить"
				onClick={onClick}
				curValue={progress}
				totalValue={totalSeconds * 1000}
			/>
		</div>
	);
};
