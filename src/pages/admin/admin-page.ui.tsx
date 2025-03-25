import css from './admin-page.module.scss';
import { useAuth } from 'app/providers/auth';
import { fetchGetPatientList, PatientList } from 'entities/patient/patient-list';
import { PatientPagination } from 'features/patient';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/store';
import { Button, Container, PageHead, TitleBlock } from 'shared/ui/components';

export const AdminPage = () => {
	const { logout } = useAuth();
	const dispatch = useAppDispatch();
	const [searchParams] = useSearchParams();

	useEffect(() => {
		dispatch(fetchGetPatientList(Number(searchParams.get('page'))));
	}, [dispatch, searchParams]);

	return (
		<Container>
			<PageHead>
				<Button onClick={logout} width="big">
					Выйти
				</Button>
			</PageHead>
			<TitleBlock className={css['title']} title="Исследования" />
			{/* <PatientFilter /> */}
			{/* <PatientSearch /> */}
			<PatientList />
			<PatientPagination />
		</Container>
	);
};
