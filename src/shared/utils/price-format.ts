import { Price } from 'shared/types';

export const priceFormat = (number: number): Price => {
	return new Intl.NumberFormat('ru-RU', {
		style: 'currency',
		currency: 'RUB',
	}).format(number) as Price;
};
