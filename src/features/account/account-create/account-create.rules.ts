import { yup } from 'shared/lib/yup';

export const accountCreateFormRules = yup.object().shape({
	name: yup.string().required().min(3).max(50),
	type: yup.number().required(),
	amount: yup.number().transform((value, originalValue) => (originalValue === '' ? 0 : value)),
	comment: yup.string().nullable(),
});
