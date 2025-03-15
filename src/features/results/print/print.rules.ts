import { yup } from 'shared/lib/yup';

export const printFormRules = yup.object().shape({
	reportType: yup.string().required(),
});
