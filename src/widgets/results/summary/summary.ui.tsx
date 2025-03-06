import css from './summary.module.scss';
import { Model3d, PulsCircle, ResultHead, TabsButton } from 'shared/ui/components';

export const Summary = () => {
	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead />
				<div className={css['value']}>
					<PulsCircle
						color="#96D665"
						diameter={150}
						fontSize={20}
						title="Общая оценка:"
						status="Хорошо"
						value="(7/10)"
					/>
				</div>
				<div className={css['buttons']}>
					<TabsButton className={css['btn']} index={2}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Состав тела:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#96D665" diameter={85} fontSize={18} status="Хорошо" value="(8/10)" />
						</div>
					</TabsButton>
					<TabsButton className={css['btn']} index={3}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Обмен веществ:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#F9EC5C" diameter={85} fontSize={18} status="Средне" value="(6/10)" />
						</div>
					</TabsButton>
					<TabsButton className={css['btn']} index={4}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Стресс:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#96D665" diameter={85} fontSize={18} status="Хорошо" value="(8/10)" />
						</div>
					</TabsButton>
					<TabsButton className={css['btn']} index={5}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Сердечно-сосудистая система:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#F9EC5C" diameter={85} fontSize={18} status="Средне" value="(6/10)" />
						</div>
					</TabsButton>
				</div>
			</div>
			<Model3d />
		</div>
	);
};
