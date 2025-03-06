import css from './summary.module.scss';
import { Model3d, TabsButton } from 'shared/ui/components';

export const Summary = () => {
	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<div className={css['head']}>
					<p className={css['patient']}>
						Пациент: <span>Константинопольский К.К. (М)</span>
					</p>
					<p className={css['age']}>
						Полных лет: <span>52</span>
					</p>
				</div>
				<div className={css['common']}>circle</div>
				<div className={css['buttons']}>
					<TabsButton index={2}>Состав тела:</TabsButton>
					<TabsButton index={3}>Обмен веществ:</TabsButton>
					<TabsButton index={4}>Стресс:</TabsButton>
					<TabsButton index={5}>Сердечно-сосудистая система:</TabsButton>
				</div>
			</div>
			<Model3d />
		</div>
	);
};
