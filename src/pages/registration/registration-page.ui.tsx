import css from './registration-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead } from 'shared/ui/components';
import { path } from 'shared/lib/router';

export const RegistrationPage = () => {
	const navigate = useNavigate();
	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
					В начало
				</Button>
			</PageHead>
		</Container>
	);
};
