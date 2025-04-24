import { yup } from 'shared/lib/yup';

export const overridePulsFormRules = yup.object().shape({
	spo2: yup.string().required(),
	heartrate: yup.string().required(),
});
