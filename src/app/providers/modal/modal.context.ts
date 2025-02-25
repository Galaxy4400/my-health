import { createContext } from 'react';
import { ModalFunctions, ModalState } from './modal.types';

export const ModalFunctionContext = createContext<ModalFunctions | null>(null);

export const ModalStateContext = createContext<ModalState | null>(null);
