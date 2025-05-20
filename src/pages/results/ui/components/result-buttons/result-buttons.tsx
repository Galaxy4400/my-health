import css from './result-buttons.module.scss';
import { Icon } from 'shared/ui/icons';
import { TabsButton, useTabs } from 'shared/ui/components';
import { Icons, ResultPage } from 'shared/types';
import cn from 'classnames';

export const ResultButtons = () => {
	const { openIndex } = useTabs();

	return (
		<div className={css['main']}>
			{openIndex === 1 ? (
				<>
					<h3 className={css['title']}>Рекомендации:</h3>
					<div className={css['start']}>
						<TabsButton className={cn(css['btn'], 'center')} index={ResultPage.risk}>
							<div className={css['icon']}>
								<Icon name={Icons.alarm} />
							</div>
							Факторы риска
						</TabsButton>
						<TabsButton className={cn(css['btn'], 'center')} index={ResultPage.nutrition}>
							<div className={css['icon']}>
								<Icon name={Icons.apple} />
							</div>
							Питание
						</TabsButton>
						<TabsButton className={cn(css['btn'], 'center')} index={ResultPage.sport}>
							<div className={css['icon']}>
								<Icon name={Icons.gantel} />
							</div>
							Спорт, SPA
						</TabsButton>
					</div>
				</>
			) : (
				<div className={css['all']}>
					<TabsButton className={css['btn']} index={ResultPage.summary}>
						<div className={css['icon']}>
							<Icon name={Icons.doc} />
						</div>
						Сводка
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.metabolism}>
						<div className={css['icon']}>
							<Icon name={Icons.back} />
						</div>
						Обмен веществ
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.cardio}>
						<div className={css['icon']}>
							<Icon name={Icons.heart} />
						</div>
						Сердечно-сосудистая
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.nutrition}>
						<div className={css['icon']}>
							<Icon name={Icons.apple} />
						</div>
						Питание
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.body}>
						<div className={css['icon']}>
							<Icon name={Icons.body} />
						</div>
						Состав тела
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.stress}>
						<div className={css['icon']}>
							<Icon name={Icons.brain} />
						</div>
						Стресс
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.risk}>
						<div className={css['icon']}>
							<Icon name={Icons.alarm} />
						</div>
						Факторы риска
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.sport}>
						<div className={css['icon']}>
							<Icon name={Icons.gantel} />
						</div>
						Спорт, SPA
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.spine}>
						<div className={css['icon']}>
							<Icon name={Icons.gantel} />
						</div>
						Здоровье позвоночника
					</TabsButton>
					<TabsButton className={css['btn']} index={ResultPage.circulation}>
						<div className={css['icon']}>
							<Icon name={Icons.gantel} />
						</div>
						Микро-циркуляция
					</TabsButton>
				</div>
			)}
		</div>
	);
};
