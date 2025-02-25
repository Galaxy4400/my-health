import { ChartData } from 'chart.js';
import { ru } from 'date-fns/locale';
import { AnalyticsDataGenerator } from './analytics-data-generator';
import { TimeRange } from '../types';
import {
	addMonths,
	addYears,
	endOfMonth,
	endOfYear,
	format,
	startOfMonth,
	startOfYear,
	subYears,
} from 'date-fns';

export class YearDataGenerator extends AnalyticsDataGenerator {
	protected getRangeOfStep(date: Date): TimeRange {
		return { start: startOfMonth(date), end: endOfMonth(date) };
	}

	protected getLabelOfStep(date: Date): string[] {
		return [format(date, 'LLLL', { locale: ru })];
	}

	protected getNextDateOfStep(date: Date): Date {
		return addMonths(date, 1);
	}

	protected getTotalRange(): TimeRange {
		return { start: startOfYear(this.date), end: endOfYear(this.date) };
	}

	async getPrevData(): Promise<ChartData<'bar'>> {
		this.setDate(startOfYear(subYears(this.date, 1)));

		return await this.getData();
	}

	async getNextData(): Promise<ChartData<'bar'>> {
		this.setDate(startOfYear(addYears(this.date, 1)));

		return await this.getData();
	}

	getRangeLabel(): string {
		return format(this.date, 'yyyy');
	}
}
