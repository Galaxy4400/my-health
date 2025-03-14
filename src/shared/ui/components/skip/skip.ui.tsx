import css from './skip.module.scss';
import { Button } from '../button';
import { Warning } from '../warning';

interface SkipProps {
	onConfirm: () => void;
	onReject: () => void;
}

export const Skip = ({ onConfirm, onReject }: SkipProps) => {
	return (
		<div className={css['main']}>
			<Warning
				header="Пропустить это шаг?"
				text={
					<>
						<p>Если пропустите измерение - это снизит точность диагностики.</p>
						<p>Вы уверены?</p>
					</>
				}
			/>
			<div className={css['actions']}>
				<Button onClick={onReject}>Нет, вернуться к измерению</Button>
				<Button onClick={onConfirm} color="second">
					Да, пропустить
				</Button>
			</div>
		</div>
	);
};
