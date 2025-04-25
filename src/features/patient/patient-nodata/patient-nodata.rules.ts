import { yup } from 'shared/lib/yup';

export const patientNodataFormRules = yup.object({
	visitorId: yup.string(),
	gender: yup.string().required('Gender is required'),
	age: yup.string().required('Age is required'),
	height: yup.lazy((_, { context }) => {
		return context?.hasHeight ? yup.string().required() : yup.string().nullable();
	}),
});
