import { PropsWithChildren } from 'react';
import { AuthProvider } from './auth';
import { ModalProvider } from './modal';
import { StoreProvider } from './store';
import { KeyboardProvider } from './keyboard/keyboard.provider';

export const Providers = ({ children }: PropsWithChildren) => {
	return (
		<StoreProvider>
			<AuthProvider>
				<ModalProvider>
					<KeyboardProvider>{children}</KeyboardProvider>
				</ModalProvider>
			</AuthProvider>
		</StoreProvider>
	);
};
