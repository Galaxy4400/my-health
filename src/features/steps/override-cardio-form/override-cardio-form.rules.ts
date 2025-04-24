import { yup } from 'shared/lib/yup';

export const overrideCardioFormRules = yup.object().shape({
	systolic: yup.string().required(),
	diastolic: yup.string().required(),
});
