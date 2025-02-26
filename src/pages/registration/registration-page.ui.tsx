import css from './registration-page.module.scss';
import { Container } from 'shared/ui/components';

export const RegistrationPage = () => {
	return (
		<div className={css['main']}>
			<Container>
				<div className={css['body']}>Step 1</div>
			</Container>
		</div>
	);
};
