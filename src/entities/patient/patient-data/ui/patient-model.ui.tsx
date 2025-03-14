import css from './patient-model.module.scss';
import { MODELS_URLS, Gender } from 'shared/api/patient';

type ModelType = 'model' | 'brain' | 'heart' | 'intestine';

interface PatientModelProps {
	gender?: Gender;
	model?: ModelType;
	colors?: string;
}

export const PatientModel = ({ gender = Gender.male, model = 'model', colors = '' }: PatientModelProps) => {
	return (
		<div className={css['model']}>
			{/* <div className={css['title']}>
				<p className={css['text']}>Ваш идентификатор для будущих обследований:</p>
				<p className={css['code']}>А123456</p>
				<p className={css['text']}>Запомните или запишите его у себя</p>
			</div> */}
			<div className={css['frame']}>
				<iframe src={MODELS_URLS[gender][model] + colors} width="100%" height="660px"></iframe>
			</div>
		</div>
	);
};
