import { yup } from 'shared/lib/yup';

export const patientFormRules = yup.object().shape({
	sex: yup.string().required(),
	age: yup.string().required(),
	q1: yup.string().required(),
	q2: yup.string().required(),
	q3: yup.string().required(),
	q4: yup.string().required(),
});
