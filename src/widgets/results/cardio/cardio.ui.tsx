import css from './cardio.module.scss';
import { GradientValue, MainValue, Model3d, ResultHead, ValueItem, ValueList } from 'shared/ui/components';

export const Cardio = () => {
	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead patient="Константинопольский К.К. (М)" age="52" />
				<MainValue
					className={css['main-value']}
					title="Сердечно-сосудистая система:"
					color="#95D665"
					status="Средне"
					value="(6/10)"
				/>
				<ValueList>
					<ValueItem title="Систолическое давление:">
						<GradientValue
							title="выше нормы (140)"
							value={140}
							min={0}
							max={180}
							gradientColors={['#FD531B', '#FFEA07', '#95D665']}
						/>
					</ValueItem>
					<ValueItem title="Диастолическое давление:">
						<GradientValue
							title="в норме (85)"
							value={85}
							min={0}
							max={150}
							gradientColors={['#FD531B', '#FFEA07', '#95D665']}
						/>
					</ValueItem>
					<ValueItem title="Пульс:">
						<GradientValue
							title="выше нормы (80)"
							value={80}
							min={0}
							max={100}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="Насыщение крови кислородом (SpO2):">
						<GradientValue
							title="отличное (99)"
							value={99}
							min={0}
							max={200}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="Артериальная жёсткость:">
						<GradientValue
							title="выше нормы (80)"
							value={80}
							min={0}
							max={100}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="Нарушения сердечного ритма:">
						<GradientValue title="не обнаружены" gradientColors="#95D665" />
					</ValueItem>
				</ValueList>
			</div>
			<Model3d url="https://server1.webisgroup.ru/health.ru/frames/man_organs.php?group=Heart" />
		</div>
	);
};
