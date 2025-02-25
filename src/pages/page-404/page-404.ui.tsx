import { Container, Grid } from '../../shared/ui/components';
import { PageHeader } from '../../widgets/page-header';

export const Page404 = () => {
	return (
		<Container>
			<Grid gap={20}>
				<PageHeader title="404" />
				<h3>Страница не найдена</h3>
			</Grid>
		</Container>
	);
};
