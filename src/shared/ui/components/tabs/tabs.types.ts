/* eslint-disable no-unused-vars */
import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { PropsWithElement } from 'shared/types';

export interface TabsContextValue {
	toggle: (index: number) => void;
	openIndex: number | null;
}

export interface TabsProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
	active?: number | null;
}

export interface TabsItemProps extends PropsWithChildren, PropsWithElement, HTMLAttributes<HTMLDivElement> {
	index: number;
	title: string;
}

export interface TabsContainerProps
	extends PropsWithChildren,
		PropsWithElement,
		HTMLAttributes<HTMLDivElement> {
	index: number;
	title: string;
}
