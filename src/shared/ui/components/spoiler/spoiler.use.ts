import { useContext } from 'react';
import { SpoilerContext, SpoilerContextValue } from './spoiler.context';

export const useSpoiler = (): SpoilerContextValue => {
	const context = useContext(SpoilerContext);

	if (context === null) {
		throw new Error('useSpoiler must be used within a SpoilerContextValue');
	}

	return context;
};
