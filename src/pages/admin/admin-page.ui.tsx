import css from './admin-page.module.scss';
import { useAuth } from 'app/providers/auth';
import { ParticipantList } from 'entities/participant';
import { ParticipantFilter, ParticipantPagination, ParticipantSearch } from 'features/participant';
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
			<ParticipantFilter />
			<ParticipantSearch />
			<ParticipantList />
			<ParticipantPagination />
		</Container>
	);
};
