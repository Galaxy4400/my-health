import css from './result-buttons.module.scss';
import { Icon } from 'shared/ui/icons';
import { TabsButton, useTabs } from 'shared/ui/components';
import { Icons } from 'shared/types';
import cn from 'classnames';

export const ResultButtons = () => {
	const { openIndex } = useTabs();

	return (
		<div className={css['main']}>
			{openIndex === 1 ? (
				<>
					<h3 className={css['title']}>Рекомендации:</h3>
					<div className={css['start']}>
						<TabsButton className={cn(css['btn'], 'center')} index={6}>
							<div className={css['icon']}>
								<Icon name={Icons.alarm} />
							</div>
							Факторы риска
						</TabsButton>
						<TabsButton className={cn(css['btn'], 'center')} index={7}>
							<div className={css['icon']}>
								<Icon name={Icons.apple} />
							</div>
							Питание
						</TabsButton>
						<TabsButton className={cn(css['btn'], 'center')} index={8}>
							<div className={css['icon']}>
								<Icon name={Icons.gantel} />
							</div>
							Спорт, SPA
						</TabsButton>
					</div>
				</>
			) : (
				<div className={css['all']}>
					<TabsButton className={css['btn']} index={1}>
						<div className={css['icon']}>
							<Icon name={Icons.doc} />
						</div>
						Сводка
					</TabsButton>
					<TabsButton className={css['btn']} index={3}>
						<div className={css['icon']}>
							<Icon name={Icons.back} />
						</div>
						Обмен веществ
					</TabsButton>
					<TabsButton className={css['btn']} index={5}>
						<div className={css['icon']}>
							<Icon name={Icons.heart} />
						</div>
						Сердечно-сосудистая
					</TabsButton>
					<TabsButton className={css['btn']} index={7}>
						<div className={css['icon']}>
							<Icon name={Icons.apple} />
						</div>
						Питание
					</TabsButton>
					<TabsButton className={css['btn']} index={2}>
						<div className={css['icon']}>
							<Icon name={Icons.body} />
						</div>
						Состав тела
					</TabsButton>
					<TabsButton className={css['btn']} index={4}>
						<div className={css['icon']}>
							<Icon name={Icons.brain} />
						</div>
						Стресс
					</TabsButton>
					<TabsButton className={css['btn']} index={6}>
						<div className={css['icon']}>
							<Icon name={Icons.alarm} />
						</div>
						Факторы риска
					</TabsButton>
					<TabsButton className={css['btn']} index={8}>
						<div className={css['icon']}>
							<Icon name={Icons.gantel} />
						</div>
						Спорт, SPA
					</TabsButton>
				</div>
			)}
		</div>
	);
};
