import { PropsWithChildren } from 'react';
import { AuthProvider } from './auth';
import { ModalProvider } from './modal';
import { StoreProvider } from './store';
import { KeyboardProvider } from './keyboard';

export const Providers = ({ children }: PropsWithChildren) => {
	return (
		<StoreProvider>
			<AuthProvider>
				<KeyboardProvider>
					<ModalProvider>{children}</ModalProvider>
				</KeyboardProvider>
			</AuthProvider>
		</StoreProvider>
	);
};
