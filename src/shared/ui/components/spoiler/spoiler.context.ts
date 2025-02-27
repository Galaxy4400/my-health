/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { SpoilerContextValue } from './spoiler.types';

export const SpoilerContext = createContext<SpoilerContextValue | null>(null);
