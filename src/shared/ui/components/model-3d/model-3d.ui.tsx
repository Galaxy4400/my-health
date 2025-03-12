import css from './model-3d.module.scss';
import { Scene } from 'shared/ui/scene-3d/scene';
import model from 'shared/assets/img/model.png';

export const Model3d = ({ url }: { url: string }) => {
	return (
		<div className={css['model']}>
			{/* <div className={css['title']}>
				<p className={css['text']}>Ваш идентификатор для будущих обследований:</p>
				<p className={css['code']}>А123456</p>
				<p className={css['text']}>Запомните или запишите его у себя</p>
			</div> */}
			<div className={css['frame']}>
				{/* <Scene /> */}
				<iframe src={url} width="100%" height="660px"></iframe>
			</div>
		</div>
	);
};
