import { yup } from 'shared/lib/yup';

export const cardFormRules = yup.object().shape({
	code: yup.string().required(),
});
