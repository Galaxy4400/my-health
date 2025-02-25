import css from './step-1-page.module.scss';
import { Container } from 'shared/ui/components';

export const Step1Page = () => {
	return (
		<div className={css['main']}>
			<Container>
				<div className={css['body']}>Step 1</div>
			</Container>
		</div>
	);
};
