import css from './stress.module.scss';
import { GradientValue, MainValue, Model3d, ResultHead, ValueItem, ValueList } from 'shared/ui/components';

export const Stress = () => {
	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead patient="Константинопольский К.К. (М)" age="52" />
				<MainValue
					className={css['main-value']}
					title="Стресс:"
					color="#95D665"
					status="Хорошо"
					value="(8/10)"
				/>
				<ValueList>
					<ValueItem title="ИМТ:">
						<GradientValue
							title="низкий (2/10)"
							value={2}
							min={0}
							max={10}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="Базовый расход калорий:">
						<GradientValue
							title="низкая (3/10)"
							value={3}
							min={0}
							max={10}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
				</ValueList>
			</div>
			<Model3d url="https://server1.webisgroup.ru/health.ru/frames/man_organs.php?group=Brain" />
		</div>
	);
};
