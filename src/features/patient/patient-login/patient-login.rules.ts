import { yup } from 'shared/lib/yup';

export const patientLoginFormRules = yup.object().shape({
	code: yup.string().required().min(3).max(30),
});
