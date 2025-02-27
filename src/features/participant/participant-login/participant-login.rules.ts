import { yup } from 'shared/lib/yup';

export const participantLoginFormRules = yup.object().shape({
	code: yup.string().required().min(3).max(30),
});
