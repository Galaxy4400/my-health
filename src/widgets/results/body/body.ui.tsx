import css from './body.module.scss';
import { MainValue, Model3d, ResultHead, Tabs, TabsButton, TabsContainer } from 'shared/ui/components';

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
										<div>test 1</div>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Процент мышц:</h5>
										<div>test 1</div>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Телесный жир:</h5>
										<div>test 1</div>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Подкожный жир:</h5>
										<div>test 1</div>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Висцеральный жир:</h5>
										<div>test 1</div>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Вода:</h5>
										<div>test 1</div>
									</div>
								</div>
							</div>
						</TabsContainer>
						<TabsContainer index={2}>
							<div className={css['content-wrapper']}>
								<div className={css['value-list']}>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Вес:</h5>
										<div>test 2</div>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Скелетные мышцы:</h5>
										<div>test 2</div>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Костная масса:</h5>
										<div>test 2</div>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Белок:</h5>
										<div>test 2</div>
									</div>
									<div className={css['value-row']}>
										<h5 className={css['value-title']}>Идеальный вес тела:</h5>
										<div>test 2</div>
									</div>
								</div>
							</div>
						</TabsContainer>
						<TabsContainer index={3}>
							<div className={css['content-wrapper']}>
								<div className={css['value-grid']}>
									<div className={css['value-item']}>
										<h5 className={css['value-title']}>Левая рука:</h5>
										<div>test 3</div>
										<div>test 3</div>
									</div>
									<div className={css['value-item']}>
										<h5 className={css['value-title']}>Правая рука:</h5>
										<div>test 3</div>
										<div>test 3</div>
									</div>
									<div className={css['value-item']}>
										<h5 className={css['value-title']}>Торс:</h5>
										<div>test 3</div>
										<div>test 3</div>
									</div>
									<div className={css['value-item']}>
										<h5 className={css['value-title']}>Левая нога:</h5>
										<div>test 3</div>
										<div>test 3</div>
									</div>
									<div className={css['value-item']}>
										<h5 className={css['value-title']}>Правая нога:</h5>
										<div>test 3</div>
										<div>test 3</div>
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
