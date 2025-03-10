import { Model3d } from 'shared/ui/components';
import { MODELS_URLS, Sex } from 'shared/api/patient';

type ModelType = 'model' | 'brain' | 'heart' | 'intestine';

interface PatientModelProps {
	sex?: Sex;
	model?: ModelType;
}

export const PatientModel = ({ sex = Sex.man, model = 'model' }: PatientModelProps) => {
	console.log(sex, model, MODELS_URLS[sex][model]);

	return <Model3d url={MODELS_URLS[sex][model]} />;
};
