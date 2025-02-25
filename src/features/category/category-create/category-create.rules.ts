import { yup } from 'shared/lib/yup';

export const categoryCreateFormRules = yup.object().shape({
	type: yup.number().required(),
	icon: yup.string().required(),
	name: yup.string().required().min(3).max(50),
});
