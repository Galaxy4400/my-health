/* eslint-disable no-unused-vars */
import { ChartData } from 'chart.js';
import { getOperations, OperationType } from 'shared/api/operation';
import { ID } from 'shared/types';
import { CategoryType } from 'shared/lib/category';
import { isAfter, isBefore } from 'date-fns';
import { TimeRange } from '../types';

export abstract class AnalyticsDataGenerator {
	private labels: string[][] = [];
	private incomeData: number[] = [];
	private expenseData: number[] = [];

	protected date: Date = new Date();
	protected account: ID | null = null;
	protected totalRange: TimeRange = { start: new Date(), end: new Date() };

	protected abstract getRangeOfStep(date: Date): TimeRange;

	protected abstract getLabelOfStep(date: Date): string[];

	protected abstract getNextDateOfStep(date: Date): Date;

	protected abstract getTotalRange(): TimeRange;

	abstract getRangeLabel(): string;

	abstract getPrevData(): Promise<ChartData<'bar'>>;

	abstract getNextData(): Promise<ChartData<'bar'>>;

	protected setDate(date: Date): this {
		this.date = date;
		return this;
	}

	setAccount(account: ID | null): this {
		this.account = account;
		return this;
	}

	private setTotalRange(): this {
		this.totalRange = this.getTotalRange();
		return this;
	}

	private operationsTotalSum = (operations: OperationType[]) => {
		return operations.reduce(
			(sum, operation) => {
				if (operation.category?.type === CategoryType.income) {
					sum.income += operation.amount;
				} else {
					sum.expense += operation.amount;
				}
				return sum;
			},
			{ income: 0, expense: 0 },
		);
	};

	private async getOperations(): Promise<OperationType[]> {
		try {
			const { pagingData } = await getOperations({
				daterange: `${this.totalRange.start.toISOString()},${this.totalRange.end.toISOString()}`,
				...(this.account && { account: this.account }),
			});

			return pagingData?.items || [];
		} catch (error) {
			throw new Error(error as string);
		}
	}

	private findOperationsOfStep(operations: OperationType[], rangeOfStep: TimeRange): OperationType[] {
		return operations?.filter(
			(operation) =>
				isAfter(operation.createdAt, rangeOfStep.start) && isBefore(operation.createdAt, rangeOfStep.end),
		);
	}

	private clear(): this {
		this.labels = [];
		this.incomeData = [];
		this.expenseData = [];

		return this;
	}

	private async fillData(): Promise<void> {
		this.clear();
		this.setTotalRange();

		const operations = await this.getOperations();

		let startDateOfStep = this.totalRange.start;

		while (isBefore(startDateOfStep, this.totalRange.end)) {
			const rangeOfStep = this.getRangeOfStep(startDateOfStep);

			const operationsOfStep = this.findOperationsOfStep(operations, rangeOfStep);

			const operationsTotalSum = this.operationsTotalSum(operationsOfStep);

			this.labels.push(this.getLabelOfStep(startDateOfStep));
			this.incomeData.push(operationsTotalSum.income);
			this.expenseData.push(operationsTotalSum.expense);

			startDateOfStep = this.getNextDateOfStep(startDateOfStep);
		}
	}

	async getData(): Promise<ChartData<'bar'>> {
		await this.fillData();

		return {
			labels: this.labels,
			datasets: [
				{
					label: 'Доход',
					data: this.incomeData,
					backgroundColor: 'rgba(49, 198, 118, 0.5)',
				},
				{
					label: 'Расход',
					data: this.expenseData,
					backgroundColor: 'rgba(255, 99, 132, 0.5)',
				},
			],
		};
	}
}
