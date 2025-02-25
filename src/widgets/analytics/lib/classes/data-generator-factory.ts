import { AnalyticsDataGenerator } from './analytics-data-generator';
import { MonthDataGenerator } from './month-data-generator';
import { WeekDataGenerator } from './week-data-generator';
import { YearDataGenerator } from './year-data-generator';

export class DataGeneratorFactory {
	static create(type: 'week' | 'month' | 'year'): AnalyticsDataGenerator {
		switch (type) {
			case 'week':
				return new WeekDataGenerator();
			case 'month':
				return new MonthDataGenerator();
			case 'year':
				return new YearDataGenerator();
			default:
				throw new Error('Unknown data generator type');
		}
	}
}
