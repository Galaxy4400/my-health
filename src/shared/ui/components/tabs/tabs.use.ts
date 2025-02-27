import { useContext } from 'react';
import { TabsContext } from './tabs.context';
import { TabsContextValue } from './tabs.types';

export const useTabs = (): TabsContextValue => {
	const context = useContext(TabsContext);

	if (context === null) {
		throw new Error('useTabs must be used within a TabsContextValue');
	}

	return context;
};
