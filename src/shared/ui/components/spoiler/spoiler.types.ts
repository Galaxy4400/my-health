/* eslint-disable no-unused-vars */
import { HTMLAttributes, PropsWithChildren, ReactNode } from 'react';
import { PropsWithElement } from 'shared/types';

export interface SpoilerProps extends PropsWithChildren, HTMLAttributes<HTMLDivElement> {
	active?: number | null;
}

export interface SpoilerContextValue {
	toggle: (index: number) => void;
	openIndex: number | null;
}

export interface SpoilerItemProps extends PropsWithChildren, PropsWithElement {
	index: number;
	title: string;
}
