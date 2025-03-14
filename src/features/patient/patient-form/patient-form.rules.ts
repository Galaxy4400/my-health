import { yup } from 'shared/lib/yup';

export const patientFormRules = yup.object().shape({
	gender: yup.string().required(),
	age: yup.string().required(),
	heart: yup.string().required(),
	breathing: yup.string().required(),
	diabetes: yup.string().required(),
	pregnacy: yup.string().required(),
});
