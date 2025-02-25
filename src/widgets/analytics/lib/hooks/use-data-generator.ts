import { ChartData } from 'chart.js';
import { useEffect, useMemo, useState } from 'react';
import { ChartRangeType } from '../types';
import { DataGeneratorFactory } from '../classes';
import { ID } from 'shared/types';

export const useDataGenerator = () => {
	const [data, setData] = useState<ChartData<'bar'> | null>(null);
	const [account, setAccount] = useState<ID | null>(null);
	const [rangeType, setRangeType] = useState<ChartRangeType>(ChartRangeType.week);
	const [isLoading, setIsLoading] = useState(false);
	const dataGenerator = useMemo(() => DataGeneratorFactory.create(rangeType), [rangeType]);
	const [rangeLabel, setRangeLabel] = useState(dataGenerator.getRangeLabel());

	useEffect(() => {
		setIsLoading(true);

		dataGenerator
			.setAccount(account)
			.getData()
			.then((data) => {
				setData(data);
				setIsLoading(false);
				setRangeLabel(dataGenerator.getRangeLabel());
			});
	}, [dataGenerator, account]);

	const prev = () => {
		setIsLoading(true);

		dataGenerator.getPrevData().then((data) => {
			setData(data);
			setIsLoading(false);
			setRangeLabel(dataGenerator.getRangeLabel());
		});
	};

	const next = () => {
		setIsLoading(true);

		dataGenerator.getNextData().then((data) => {
			setData(data);
			setIsLoading(false);
			setRangeLabel(dataGenerator.getRangeLabel());
		});
	};

	return { data, rangeLabel, isLoading, setAccount, setRangeType, prev, next };
};
