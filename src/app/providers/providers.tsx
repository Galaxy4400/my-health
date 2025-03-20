import { PropsWithChildren } from 'react';
import { AuthProvider } from './auth';
import { ModalProvider } from './modal';
import { StoreProvider } from './store';
import { KeyboardProvider } from './keyboard';
import { VoiceProvider } from './voice';

export const Providers = ({ children }: PropsWithChildren) => {
	return (
		<StoreProvider>
			<AuthProvider>
				<VoiceProvider>
					<KeyboardProvider>
						<ModalProvider>{children}</ModalProvider>
					</KeyboardProvider>
				</VoiceProvider>
			</AuthProvider>
		</StoreProvider>
	);
};
