import { useContext } from 'react';
import { KeyboardContextValues } from './keyboard.types';
import { KeyboardContext } from './keyboard.context';

export const useKeyboard = (): KeyboardContextValues => {
	const context = useContext(KeyboardContext);

	if (context === null) {
		throw new Error('useKeyboard must be used within an KeyboardState');
	}

	return context;
};
