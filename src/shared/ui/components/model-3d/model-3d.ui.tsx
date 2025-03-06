import css from './model-3d.module.scss';
import model from 'shared/assets/img/model.png';

export const Model3d = () => {
	return (
		<div className={css['model']}>
			<div className={css['title']}>
				<p className={css['text']}>Ваш идентификатор для будущих обследований:</p>
				<p className={css['code']}>А123456</p>
				<p className={css['text']}>Запомните или запишите его у себя</p>
			</div>
			<div className={css['frame']}>
				<img src={model} alt="model" />
			</div>
		</div>
	);
};
