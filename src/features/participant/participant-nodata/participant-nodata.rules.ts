import { yup } from 'shared/lib/yup';

export const participantNodataFormRules = yup.object().shape({
	sex: yup.string().required(),
	age: yup.string().required(),
});
