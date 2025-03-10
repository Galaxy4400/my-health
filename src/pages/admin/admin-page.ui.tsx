import css from './admin-page.module.scss';
import { useAuth } from 'app/providers/auth';
import { PatientList } from 'entities/patient/patient-list';
import { PatientFilter, PatientPagination, PatientSearch } from 'features/patient';
import { Button, Container, PageHead, TitleBlock } from 'shared/ui/components';

export const AdminPage = () => {
	const { logout } = useAuth();

	return (
		<Container>
			<PageHead>
				<Button onClick={logout} width="big">
					Выйти
				</Button>
			</PageHead>
			<TitleBlock className={css['title']} title="Исследования" />
			<PatientFilter />
			<PatientSearch />
			<PatientList />
			<PatientPagination />
		</Container>
	);
};
