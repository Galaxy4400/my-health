import { useOverflow } from 'shared/hooks';
import css from './nutrition.module.scss';
import { MainValue, Model3d, ResultHead } from 'shared/ui/components';

export const Nutrition = () => {
	const { parentRef, childRef, isOverflowing } = useOverflow();

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead patient="Константинопольский К.К. (М)" age="52" />
				<MainValue className={css['main-value']} title="Советы по питанию:" />
				<div className={css['content-wrapper']} ref={parentRef}>
					<div className={css['content']} ref={childRef}>
						<div className={css['dayly']}>
							Ежедневный расход энергии: <span>3500 Kcal</span>
						</div>
						<div className={css['norecomend']}>
							<h5 className={css['norecomend-title']}>Не рекомендуемые продукты:</h5>
							<div className={css['list']}>
								<p>
									<span>Овощи:</span> картофель, кукуруза, редька, свёкла
								</p>
								<p>
									<span>Животные жиры:</span> жирное мясо, копчёное мясо, твёрдые сыры
								</p>
								<p>
									<span>Углеводы:</span> белый сахар, белый хлеб, мёд, шоколад, мороженое, глутамат натрия
								</p>
								<p>
									<span>Жиры:</span> фритюры, майонез
								</p>
								<p>
									<span>Напитки:</span> крепкий алкоголь, пиво, какао, сладкие напитки, газированные напитки
								</p>
							</div>
						</div>
						<div className={css['recomend']}>
							<h5 className={css['recomend-title']}>Рекомендуемые продукты:</h5>
							<div className={css['list']}>
								<p>
									<span>Овощи:</span> картофель, кукуруза, редька, свёкла
								</p>
								<p>
									<span>Животные жиры:</span> жирное мясо, копчёное мясо, твёрдые сыры
								</p>
								<p>
									<span>Углеводы:</span> белый сахар, белый хлеб, мёд, шоколад, мороженое, глутамат натрия
								</p>
								<p>
									<span>Жиры:</span> фритюры, майонез
								</p>
								<p>
									<span>Напитки:</span> крепкий алкоголь, пиво, какао, сладкие напитки, газированные напитки
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
			<Model3d />
		</div>
	);
};
