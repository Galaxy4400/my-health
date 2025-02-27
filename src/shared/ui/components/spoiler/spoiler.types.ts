/* eslint-disable no-unused-vars */
import { ReactNode } from 'react';

export interface ModalState {
	isOpen: boolean;
	content: ReactNode;
}

export interface ModalFunctions {
	openModal: (content: ReactNode) => void;
	closeModal: () => void;
}
