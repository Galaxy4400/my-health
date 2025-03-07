import css from './risk.module.scss';
import { GradientValue, MainValue, Model3d, ResultHead, ValueItem, ValueList } from 'shared/ui/components';

export const Risk = () => {
	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead patient="Константинопольский К.К. (М)" age="52" />
				<MainValue className={css['main-value']} title="Факторы риска:" />
				<ValueList>
					<ValueItem title="Артериальное давление:">
						<GradientValue
							title="средний риск (4/10)"
							value={4}
							min={0}
							max={10}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="ИМТ:">
						<GradientValue
							title="выше нормы (36)"
							value={36}
							min={0}
							max={40}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="Висцеральный жир:">
						<GradientValue
							title="выше нормы (16%)"
							value={16}
							min={0}
							max={100}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="Вода:">
						<GradientValue
							title="в норме (47%)"
							value={47}
							min={0}
							max={100}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
				</ValueList>
				<div className={css['recomentations']}>
					<h3 className={css['recomentations-title']}>Рекомендации:</h3>
					<ol className={css['recomentations-list']}>
						<li>Консультация врача-кардиолога</li>
						<li>Корректировка диеты</li>
						<li>Физические упражнения</li>
					</ol>
				</div>
			</div>
			<Model3d url="https://server1.webisgroup.ru/health.ru/frames/man.php" />
		</div>
	);
};
