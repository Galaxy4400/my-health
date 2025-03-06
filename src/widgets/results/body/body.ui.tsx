import css from './body.module.scss';
import {
	GradientValue,
	MainValue,
	Model3d,
	ResultHead,
	Tabs,
	TabsButton,
	TabsContainer,
} from 'shared/ui/components';

export const Body = () => {
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
								<div className={css['value-list']}>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Мышечная масса:</h5>
										<GradientValue
											title="отлично (85.4 кг)"
											value={85.4}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Процент мышц:</h5>
										<GradientValue
											title="отлично (62.5%)"
											value={62.5}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Телесный жир:</h5>
										<GradientValue
											title="выше нормы (25%)"
											value={25}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
										/>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Подкожный жир:</h5>
										<GradientValue
											title="выше нормы (25%)"
											value={25}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
										/>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Висцеральный жир:</h5>
										<GradientValue
											title="выше нормы (16%)"
											value={16}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
										/>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Вода:</h5>
										<GradientValue
											title="ниже нормы (47%)"
											value={47}
											min={0}
											max={100}
											gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
										/>
									</div>
								</div>
							</div>
						</TabsContainer>
						<TabsContainer index={2}>
							<div className={css['content-wrapper']}>
								<div className={css['value-list']}>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Вес:</h5>
										<GradientValue
											title="выше нормы (110 кг)"
											value={110}
											min={0}
											max={120}
											gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
										/>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Скелетные мышцы:</h5>
										<GradientValue
											title="отлично (38.8%)"
											value={38.8}
											min={0}
											max={50}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Костная масса:</h5>
										<GradientValue
											title="отлично (6.1 кг)"
											value={6.1}
											min={0}
											max={7}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Белок:</h5>
										<GradientValue
											title="отлично (13.3%)"
											value={13.3}
											min={0}
											max={15}
											gradientColors={['#FD531B', '#FFEA07', '#95D665']}
										/>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Идеальный вес тела:</h5>
										<div className={css['just-value']}>82 кг</div>
									</div>
								</div>
							</div>
						</TabsContainer>
						<TabsContainer index={3}>
							<div className={css['content-wrapper']}>
								<div className={css['value-grid']}>
									<div className={css['value-item']} style={{ gridRowStart: 1, gridColumnStart: 1 }}>
										<h5 className={css['value-title']}>Левая рука:</h5>
										<div className={css['balues-block']}>
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
										</div>
									</div>
									<div className={css['value-item']} style={{ gridRowStart: 1, gridColumnStart: 3 }}>
										<h5 className={css['value-title']}>Правая рука:</h5>
										<div className={css['balues-block']}>
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
										</div>
									</div>
									<div className={css['value-item']} style={{ gridRowStart: 2, gridColumnStart: 2 }}>
										<h5 className={css['value-title']}>Торс:</h5>
										<div className={css['balues-block']}>
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
										</div>
									</div>
									<div className={css['value-item']} style={{ gridRowStart: 3, gridColumnStart: 1 }}>
										<h5 className={css['value-title']}>Левая нога:</h5>
										<div className={css['balues-block']}>
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
										</div>
									</div>
									<div className={css['value-item']} style={{ gridRowStart: 3, gridColumnStart: 3 }}>
										<h5 className={css['value-title']}>Правая нога:</h5>
										<div className={css['balues-block']}>
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
										</div>
									</div>
								</div>
							</div>
						</TabsContainer>
					</div>
				</Tabs>
			</div>
			<Model3d />
		</div>
	);
};
