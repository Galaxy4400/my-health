import { yup } from 'shared/lib/yup';

export const printFormRules = yup.object().shape({
	type: yup.string().required(),
});
