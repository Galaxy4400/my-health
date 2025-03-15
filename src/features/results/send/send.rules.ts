import { yup } from 'shared/lib/yup';

export const sendFormRules = yup.object().shape({
	email: yup.string().email().required(),
	reportType: yup.string().required(),
});
