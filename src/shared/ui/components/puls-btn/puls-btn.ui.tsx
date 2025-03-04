import css from './puls-btn.module.scss';
import { PropsWithChildren } from 'react';

interface PulsBtnProps extends PropsWithChildren {
	onClick: () => void;
}

export const PulsBtn = ({ onClick, children }: PulsBtnProps) => {
	return (
		<div className={css['wrapper']}>
			<button className={css['btn']} onClick={onClick}>
				{children}
			</button>
		</div>
	);
};
