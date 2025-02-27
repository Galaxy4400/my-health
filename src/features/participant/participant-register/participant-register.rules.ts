import { startOfDay } from 'date-fns';
import { yup } from 'shared/lib/yup';

export const participantRegisterFormRules = yup.object().shape({
	sex: yup.string().required(),
	name: yup.string().required().min(3).max(30),
	lastname: yup.string().required().min(3).max(30),
	secondname: yup.string().required().min(3).max(30),
	birthday: yup
		.string()
		.required()
		.transform((value) => startOfDay(value).toISOString()),
});
