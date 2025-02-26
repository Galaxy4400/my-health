import css from './admin-page.module.scss';
import { Container } from 'shared/ui/components';

export const AdminPage = () => {
	return (
		<div className={css['main']}>
			<Container>
				<div className={css['body']}>
					<h3 className={css['title']}>admin</h3>
				</div>
			</Container>
		</div>
	);
};
