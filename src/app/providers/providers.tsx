import { PropsWithChildren } from 'react';
import { AuthProvider } from './auth';
import { ModalProvider } from './modal';
import { StoreProvider } from './store';

export const Providers = ({ children }: PropsWithChildren) => {
	return (
		<StoreProvider>
			<AuthProvider>
				<ModalProvider>{children}</ModalProvider>
			</AuthProvider>
		</StoreProvider>
	);
};
