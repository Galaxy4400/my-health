import { yup } from 'shared/lib/yup';

export const loginFormRules = yup.object().shape({
	login: yup.string().required().min(3).max(30),
	password: yup.string().required().min(3).max(30),
});
