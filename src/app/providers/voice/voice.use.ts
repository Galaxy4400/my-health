import { useContext } from 'react';
import { VoiceActions, VoiceContext } from './voice.context';

export const useVoice = (): VoiceActions => {
	const context = useContext(VoiceContext);

	if (context === null) {
		throw new Error('useVoice must be used within an VoiceActions');
	}

	return context;
};
