import css from './footer.module.scss';
import { Container } from 'shared/ui/components';

export const Footer = () => {
	return (
		<footer className={css['footer']}>
			<Container></Container>
		</footer>
	);
};
