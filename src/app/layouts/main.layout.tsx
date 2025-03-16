import css from './layouts.module.scss';
import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from 'shared/ui/components';
import { Header } from 'widgets/header';
import { PropsWithChildren, useEffect } from 'react';
import { IdleProvider } from 'app/providers/idle';
import { usePing } from 'shared/hooks';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { fetchGetApplication, selectApplicationIdle } from 'entities/application';

const intervalDelay = 1000 * 60 * 10;

export const MainLayout = ({ children }: PropsWithChildren) => {
	const { isError } = usePing();
	const dispatch = useAppDispatch();
	const idle = useAppSelector(selectApplicationIdle);

	useEffect(() => {
		const interval = setInterval(() => dispatch(fetchGetApplication()), intervalDelay);

		dispatch(fetchGetApplication());

		return () => clearInterval(interval);
	}, [dispatch]);

	return (
		<IdleProvider seconds={idle}>
			<LayoutWrapper>
				<Header />
				<main className={css['main']}>{children || <Outlet />}</main>
				{isError && (
					<div className={css['error']}>
						<h1>Диагностический стенд сейчас недоступен</h1>
						<h3>Проводятся работы по его обслуживанию. Пожалуйста, дождитесь их завершения.</h3>
					</div>
				)}
			</LayoutWrapper>
		</IdleProvider>
	);
};
