import '../shared/assets/styles/main.scss';
import { Providers } from './providers';
import { AppRouter } from './router';
import { usePing } from 'shared/hooks';

export const App = () => {
	usePing();

	return (
		<Providers>
			<AppRouter />
		</Providers>
	);
};
