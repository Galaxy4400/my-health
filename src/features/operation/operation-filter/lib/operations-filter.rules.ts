import { endOfDay, startOfDay } from 'date-fns';
import { yup } from 'shared/lib/yup';
import { ID } from 'shared/types';

const accountRules = yup
	.string()
	.nullable()
	.notRequired()
	.transform((value: ID) => (!value ? undefined : value));

const categoryRules = yup
	.string()
	.nullable()
	.notRequired()
	.transform((value: ID) => (!value ? undefined : value));

const daterangeRules = yup
	.array()
	.nullable()
	.notRequired()
	.transform((value: [string, string]) => {
		if (!value || (!value[0] && !value[1])) return undefined;

		const startDate = value[0] ? startOfDay(value[0]).toISOString() : undefined;
		const endDate = value[1] ? endOfDay(value[1]).toISOString() : undefined;

		return [startDate, endDate];
	});

const amountrangeRules = yup
	.array()
	.nullable()
	.notRequired()
	.transform((value: [number, number]) => {
		if (!value || (!value[0] && !value[1])) return undefined;

		return value;
	});

export const operationsFilterRules = yup.object().shape({
	account: accountRules,
	category: categoryRules,
	daterange: daterangeRules,
	amountrange: amountrangeRules,
});
