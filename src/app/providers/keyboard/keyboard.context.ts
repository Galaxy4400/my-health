import { createContext } from 'react';
import { KeyboardContextValues } from './keyboard.types';

export const KeyboardContext = createContext<KeyboardContextValues | null>(null);
