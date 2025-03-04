import css from './results-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps } from 'shared/ui/components';
import { path } from 'shared/lib/router';

export const ResultsPage = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
					Завершить обследование
				</Button>
			</PageHead>
			<Steps current={5} />
			Результаты
		</Container>
	);
};
