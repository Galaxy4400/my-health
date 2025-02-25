import { ChartData } from 'chart.js';
import { ru } from 'date-fns/locale';
import { AnalyticsDataGenerator } from './analytics-data-generator';
import { TimeRange } from '../types';
import {
	addDays,
	addMonths,
	endOfDay,
	endOfMonth,
	format,
	startOfDay,
	startOfMonth,
	subMonths,
} from 'date-fns';

export class MonthDataGenerator extends AnalyticsDataGenerator {
	protected getRangeOfStep(date: Date): TimeRange {
		return { start: startOfDay(date), end: endOfDay(date) };
	}

	protected getLabelOfStep(date: Date): string[] {
		return [format(date, 'dd.MM.yyyy')];
	}

	protected getNextDateOfStep(date: Date): Date {
		return addDays(date, 1);
	}

	protected getTotalRange(): TimeRange {
		return { start: startOfMonth(this.date), end: endOfMonth(this.date) };
	}

	async getPrevData(): Promise<ChartData<'bar'>> {
		this.setDate(startOfMonth(subMonths(this.date, 1)));

		return await this.getData();
	}

	async getNextData(): Promise<ChartData<'bar'>> {
		this.setDate(startOfMonth(addMonths(this.date, 1)));

		return await this.getData();
	}

	getRangeLabel(): string {
		return format(this.date, 'LLLL', { locale: ru });
	}
}
