import { PropsWithChildren, useCallback, useRef } from 'react';
import { VoiceContext } from './voice.context';
import { request } from 'shared/api';

export enum Voices {
	alena_neutral = 'alena:neutral',
	alena_good = 'alena:good',
	filipp = 'filipp',
	ermil_neutral = 'ermil:neutral',
	ermil_good = 'ermil:good',
	jane_neutral = 'jane:neutral',
	jane_good = 'jane:good',
	jane_evil = 'jane:evil',
	madirus = 'madirus',
	omazh_neutral = 'omazh:neutral',
	omazh_evil = 'omazh:evil',
	zahar_neutral = 'zahar:neutral',
	zahar_good = 'zahar:good',
}

export const VoiceProvider = ({ children }: PropsWithChildren) => {
	const audioRef = useRef<HTMLAudioElement | null>(null);

	const speak = useCallback((phrase: string) => {
		if (audioRef.current) {
			audioRef.current.pause();
			audioRef.current.currentTime = 0;
		}

		request<Blob>({
			url: `/libtts/tts.php?phrase=${phrase}&voice=${Voices.jane_good}&speed=${1}`,
			responseType: 'binary',
		}).then((audioBlob) => {
			const audioUrl = URL.createObjectURL(audioBlob);
			const newAudio = new Audio(audioUrl);

			audioRef.current = newAudio;
			audioRef.current.play();
		});
	}, []);

	return <VoiceContext.Provider value={{ speak }}>{children}</VoiceContext.Provider>;
};
