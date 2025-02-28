import css from './skip.module.scss';
import { Icon } from 'shared/ui/icons';
import { Icons } from 'shared/types';
import { Button } from '../button';

interface SkipProps {
	onConfirm: () => void;
	onReject: () => void;
}

export const Skip = ({ onConfirm, onReject }: SkipProps) => {
	return (
		<div className={css['main']}>
			<div className={css['body']}>
				<div className={css['icon-column']}>
					<div className={css['icon']}>
						<Icon name={Icons.exclam} width={12} height={44} />
					</div>
				</div>
				<div className={css['content']}>
					<h3 className={css['title']}></h3>
					<div className={css['text']}>
						<p>Если пропустите измерение - это снизит точность диагностики.</p>
						<p>Вы уверены?</p>
					</div>
				</div>
			</div>
			<div className={css['actions']}>
				<Button onClick={onReject}>Нет, вернуться к измерению</Button>
				<Button onClick={onConfirm}>Да, пропустить</Button>
			</div>
		</div>
	);
};
