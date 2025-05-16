import { yup } from 'shared/lib/yup';

export const overrideBodyFormRules = yup.object().shape({
	height: yup.string().required(),
});
