import css from './summary.module.scss';
import { Model3d, PulsCircle, ResultHead, TabsButton } from 'shared/ui/components';

export const Summary = () => {
	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead />
				<PulsCircle title="Общая оценка:" status="Хорошо" value="(7/10)" diameter={150} fontSize={20} />
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
