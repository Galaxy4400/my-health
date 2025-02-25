import { ChartData } from 'chart.js';
import { ru } from 'date-fns/locale';
import { AnalyticsDataGenerator } from './analytics-data-generator';
import { TimeRange } from '../types';
import {
	addDays,
	addWeeks,
	endOfDay,
	endOfWeek,
	format,
	startOfDay,
	startOfWeek,
	subDays,
	subWeeks,
} from 'date-fns';

export class WeekDataGenerator extends AnalyticsDataGenerator {
	protected getRangeOfStep(date: Date): TimeRange {
		return { start: startOfDay(date), end: endOfDay(date) };
	}

	protected getLabelOfStep(date: Date): string[] {
		return [format(date, 'dd.MM.yyyy'), format(date, 'EEEE', { locale: ru })];
	}

	protected getNextDateOfStep(date: Date): Date {
		return addDays(date, 1);
	}

	protected getTotalRange(): TimeRange {
		return {
			start: addDays(startOfWeek(subDays(this.date, 1)), 1),
			end: addDays(endOfWeek(subDays(this.date, 1)), 1),
		};
	}

	async getPrevData(): Promise<ChartData<'bar'>> {
		this.setDate(addDays(startOfWeek(subWeeks(subDays(this.date, 1), 1)), 1));

		return await this.getData();
	}

	async getNextData(): Promise<ChartData<'bar'>> {
		this.setDate(addDays(startOfWeek(addWeeks(subDays(this.date, 1), 1)), 1));

		return await this.getData();
	}

	getRangeLabel(): string {
		return [
			format(addDays(startOfWeek(subDays(this.date, 1)), 1), 'dd.MM.yyyy'),
			format(addDays(endOfWeek(subDays(this.date, 1)), 1), 'dd.MM.yyyy'),
		].join(' / ');
	}
}
