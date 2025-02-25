/* eslint-disable no-unused-vars */

export enum ChartRangeType {
	week = 'week',
	month = 'month',
	year = 'year',
}

export interface TimeRange {
	start: Date;
	end: Date;
}
