/* eslint-disable no-unused-vars */
import { createContext } from 'react';

export interface SpoilerContextValue {
	toggle: (index: number) => void;
	openIndex: number | null;
}

export const SpoilerContext = createContext<SpoilerContextValue | null>(null);
