/* eslint-disable no-unused-vars */
import { createContext } from 'react';
import { TabsContextValue } from './tabs.types';

export const TabsContext = createContext<TabsContextValue | null>(null);
