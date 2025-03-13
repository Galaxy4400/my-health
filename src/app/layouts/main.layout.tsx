import css from './layouts.module.scss';
import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from 'shared/ui/components';
import { Header } from 'widgets/header';
import { PropsWithChildren } from 'react';
import { IdleProvider } from 'app/providers/idle';
import { useFetch, usePing } from 'shared/hooks';

export const MainLayout = ({ children }: PropsWithChildren) => {
	const { isError } = usePing();

	const { data: seconds, loading } = useFetch('mock', 9999);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<IdleProvider seconds={seconds || 60}>
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
