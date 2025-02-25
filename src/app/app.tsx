import '../shared/assets/styles/main.scss';
import { Providers } from './providers';
import { AppRouter } from './router';

export const App = () => {
	return (
		<Providers>
			<AppRouter />
		</Providers>
	);
};
