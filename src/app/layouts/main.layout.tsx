import css from './layouts.module.scss';
import { Outlet } from 'react-router-dom';
import { LayoutWrapper } from 'shared/ui/components';
import { Header } from 'widgets/header';
import { PropsWithChildren } from 'react';
import { IdleProvider } from 'app/providers/idle';
import { useFetch } from 'shared/hooks';

export const MainLayout = ({ children }: PropsWithChildren) => {
	const { data: seconds, loading } = useFetch('mock', 9999);

	if (loading) {
		return <div>Loading...</div>;
	}

	return (
		<IdleProvider seconds={seconds || 60}>
			<LayoutWrapper>
				<Header />
				<main className={css['main']}>{children || <Outlet />}</main>
			</LayoutWrapper>
		</IdleProvider>
	);
};
