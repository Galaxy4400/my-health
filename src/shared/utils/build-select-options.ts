import { OptionProps } from 'shared/types';

export const buildSelectOptions = <T>(
	source: T[],
	labelFieldName: keyof T,
	valueFieldName: keyof T,
): OptionProps[] => {
	return source.map((item) => ({
		label: item[labelFieldName] as string,
		value: item[valueFieldName] as string,
	}));
};
