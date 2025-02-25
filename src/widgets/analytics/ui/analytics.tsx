import css from './analytics.module.scss';
import loadingGif from 'shared/assets/img/loading.gif';
import ReactSelect from 'react-select';
import { useEffect, useMemo, useState } from 'react';
import { Block, Button, Loading } from 'shared/ui/components';
import { buildSelectOptions } from 'shared/utils';
import { AccountType, getAccounts } from 'shared/api/account';
import { OptionProps } from 'shared/types';
import { ChartRangeType, options, rangeTypeOptions, useDataGenerator } from '../lib';

export const Analytics = () => {
	const [accounts, setAccounts] = useState<AccountType[]>([]);
	const { data, rangeLabel, isLoading, setAccount, setRangeType, prev, next } = useDataGenerator();

	const accountOptions: OptionProps[] = useMemo(
		() => [{ label: 'Все операции', value: '' }, ...buildSelectOptions(accounts, 'name', 'id')],
		[accounts],
	);

	useEffect(() => {
		getAccounts().then(({ accounts }) => setAccounts(accounts ?? []));
	}, []);

	return (
		<div className={css['main']}>
			<Block className={css['selectors']}>
				<ReactSelect
					name="account"
					options={accountOptions}
					onChange={(event) => setAccount(event?.value ?? null)}
					defaultValue={accountOptions[0]}
				/>
				<ReactSelect
					name="rangeType"
					options={rangeTypeOptions}
					onChange={(event) => setRangeType(event?.value as ChartRangeType)}
					defaultValue={rangeTypeOptions[0]}
				/>
			</Block>
			{data ? (
				<Block>
					<div className={css['head']}>
						<Button onClick={prev}>Назад</Button>
						{isLoading ? (
							<img className={css['loading']} src={loadingGif} alt="loading" />
						) : (
							<h3 className={css['range-label']}>{rangeLabel}</h3>
						)}
						<Button onClick={next}>Вперед</Button>
					</div>
				</Block>
			) : (
				<Loading />
			)}
		</div>
	);
};
