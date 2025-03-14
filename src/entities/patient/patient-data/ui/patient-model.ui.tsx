import css from './patient-model.module.scss';

const API_BASE_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_API_BASE_URL}/` : '';

type ModelType = 'model' | 'brain' | 'heart' | 'intestine';

// interface PatientModelProps {
// 	gender?: Gender;
// 	model?: ModelType;
// 	colors?: string;
// }
interface PatientModelProps {
	url: string;
}

export const PatientModel = ({ url }: PatientModelProps) => {
	return (
		<div className={css['model']}>
			{/* <div className={css['title']}>
				<p className={css['text']}>Ваш идентификатор для будущих обследований:</p>
				<p className={css['code']}>А123456</p>
				<p className={css['text']}>Запомните или запишите его у себя</p>
			</div> */}
			<div className={css['frame']}>
				<iframe src={`${API_BASE_URL}${url}`} width="100%" height="660px"></iframe>
			</div>
		</div>
	);
};
