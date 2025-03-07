import { useOverflow } from 'shared/hooks';
import css from './sport.module.scss';
import { MainValue, Model3d, ResultHead } from 'shared/ui/components';

export const Sport = () => {
	const { parentRef, childRef, isOverflowing } = useOverflow();

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead patient="Константинопольский К.К. (М)" age="52" />
				<MainValue className={css['main-value']} title="Советы по тренировкам и SPA-процедурам:" />
				<div className={css['content-wrapper']} ref={parentRef}>
					<div className={css['content']} ref={childRef}>
						<div className={css['section']}>
							<h5 className={css['title']}>Спортивные нагрузки</h5>
							<div className={css['item']}>
								<h5 className={css['norecomend-title']}>Не рекомендуемые:</h5>
								<p>Тяжёлая атлетика, бег</p>
							</div>
							<div className={css['item']}>
								<h5 className={css['recomend-title']}>Рекомендуемые:</h5>
								<p>Плавание, ходьба, спортивная ходьба</p>
							</div>
						</div>
						<div className={css['section']}>
							<h5 className={css['title']}>SPA-процедуры</h5>
							<div className={css['item']}>
								<h5 className={css['norecomend-title']}>Не рекомендуемые:</h5>
								<p>Баня</p>
							</div>
							<div className={css['item']}>
								<h5 className={css['recomend-title']}>Рекомендуемые:</h5>
								<p>Массаж, прессотерапия</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Model3d url="https://server1.webisgroup.ru/health.ru/frames/man.php" />
		</div>
	);
};
