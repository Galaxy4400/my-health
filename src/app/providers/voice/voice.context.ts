import { createContext } from 'react';

export interface VoiceActions {
	speak: (phrase: string) => void;
}

export const VoiceContext = createContext<VoiceActions | null>(null);
