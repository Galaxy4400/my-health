import { yup } from 'shared/lib/yup';

export const patientNodataFormRules = yup.object().shape({
	sex: yup.string().required(),
	age: yup.string().required(),
});
