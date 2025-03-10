import { Sex } from 'shared/api/patient';
import css from './body.module.scss';
import {
	GradientValue,
	MainValue,
	Model3d,
	ResultHead,
	Tabs,
	TabsButton,
	TabsContainer,
	ValueGrid,
	ValueGridItem,
	ValueItem,
	ValueList,
} from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from 'entities/patient/patient-data';

export const Body = () => {
	const patient = useAppSelector(selectPatientData);

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead patient="Константинопольский К.К. (М)" age="52" />
				<MainValue
					className={css['main-value']}
					title="Состав тела:"
					color="#96D665"
					status="Хорошо"
					value="(7/10)"
				/>
				<Tabs active={1}>
					<div className={css['buttons']}>
						<TabsButton className={css['btn']} index={1}>
							Основное
						</TabsButton>
						<TabsButton className={css['btn']} index={2}>
							Подробности
						</TabsButton>
						<TabsButton className={css['btn']} index={3}>
							Анализ жира
						</TabsButton>
					</div>
					<div className={css['containers']}>
						<TabsContainer index={1}>
							<div className={css['content-wrapper']}>
								<ValueList>
									<ValueItem title="Мышечная масса:">
										<GradientValue
											title="отлично (85.4 кг)"
											value={85.4}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueItem>
									<ValueItem title="Процент мышц:">
										<GradientValue
											title="отлично (62.5%)"
											value={62.5}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueItem>
									<ValueItem title="Телесный жир:">
										<GradientValue
											title="выше нормы (25%)"
											value={25}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
										/>
									</ValueItem>
									<ValueItem title="Подкожный жир:">
										<GradientValue
											title="выше нормы (25%)"
											value={25}
											min={0}
											max={100}
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
											title="ниже нормы (47%)"
											value={47}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
										/>
									</ValueItem>
								</ValueList>
							</div>
						</TabsContainer>
						<TabsContainer index={2}>
							<div className={css['content-wrapper']}>
								<ValueList>
									<ValueItem title="Вес:">
										<GradientValue
											title="выше нормы (110 кг)"
											value={110}
											min={0}
											max={120}
											gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
										/>
									</ValueItem>
									<ValueItem title="Скелетные мышцы:">
										<GradientValue
											title="отлично (38.8%)"
											value={38.8}
											min={0}
											max={50}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueItem>
									<ValueItem title="Костная масса:">
										<GradientValue
											title="отлично (6.1 кг)"
											value={6.1}
											min={0}
											max={7}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueItem>
									<ValueItem title="Белок:">
										<GradientValue
											title="отлично (13.3%)"
											value={13.3}
											min={0}
											max={15}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueItem>
									<ValueItem title="Идеальный вес тела:">
										<GradientValue title="82 кг" />
									</ValueItem>
								</ValueList>
							</div>
						</TabsContainer>
						<TabsContainer index={3}>
							<div className={css['content-wrapper']}>
								<ValueGrid>
									<ValueGridItem title="Левая рука:" row={1} col={1}>
										<GradientValue
											title="жир: 416%"
											value={416}
											min={0}
											max={500}
											gradientColors={['#95D665', '#FFEA07', '#FD531B']}
										/>
										<GradientValue
											title="мышцы: 108%"
											value={108}
											min={0}
											max={120}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueGridItem>
									<ValueGridItem title="Правая рука:" row={1} col={3}>
										<GradientValue
											title="жир: 416%"
											value={416}
											min={0}
											max={500}
											gradientColors={['#95D665', '#FFEA07', '#FD531B']}
										/>
										<GradientValue
											title="мышцы: 108%"
											value={108}
											min={0}
											max={120}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueGridItem>
									<ValueGridItem title="Торс:" row={2} col={2}>
										<GradientValue
											title="жир: 416%"
											value={416}
											min={0}
											max={500}
											gradientColors={['#95D665', '#FFEA07', '#FD531B']}
										/>
										<GradientValue
											title="мышцы: 108%"
											value={108}
											min={0}
											max={120}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueGridItem>
									<ValueGridItem title="Левая нога:" row={3} col={1}>
										<GradientValue
											title="жир: 416%"
											value={416}
											min={0}
											max={500}
											gradientColors={['#95D665', '#FFEA07', '#FD531B']}
										/>
										<GradientValue
											title="мышцы: 108%"
											value={108}
											min={0}
											max={120}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueGridItem>
									<ValueGridItem title="Правая нога:" row={3} col={3}>
										<GradientValue
											title="жир: 416%"
											value={416}
											min={0}
											max={500}
											gradientColors={['#95D665', '#FFEA07', '#FD531B']}
										/>
										<GradientValue
											title="мышцы: 108%"
											value={108}
											min={0}
											max={120}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</ValueGridItem>
								</ValueGrid>
							</div>
						</TabsContainer>
					</div>
				</Tabs>
			</div>
			{/* <Model3d url="https://server1.webisgroup.ru/health.ru/frames/man.php" /> */}
		</div>
	);
};
