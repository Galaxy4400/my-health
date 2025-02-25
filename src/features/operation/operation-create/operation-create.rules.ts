import { yup } from 'shared/lib/yup';

export const operationCreateFormRules = yup.object().shape({
	amount: yup
		.number()
		.nullable()
		.transform((value, originalValue) => (originalValue === '' ? undefined : value))
		.required(),
	category: yup
		.string()
		.nullable()
		.transform((value, originalValue) => (originalValue === '' ? undefined : value))
		.required(),
	account: yup
		.string()
		.nullable()
		.transform((value, originalValue) => (originalValue === '' ? undefined : value))
		.required(),
	comment: yup.string(),
});
