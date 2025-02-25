import { useContext } from 'react';
import { ModalFunctionContext, ModalStateContext } from './modal.context';
import { ModalFunctions, ModalState } from './modal.types';

export const useModal = (): ModalFunctions => {
	const context = useContext(ModalFunctionContext);

	if (context === null) {
		throw new Error('useModal must be used within an ModalFunctions');
	}

	return context;
};

export const useModalState = (): ModalState => {
	const context = useContext(ModalStateContext);

	if (context === null) {
		throw new Error('useModalState must be used within an ModalState');
	}

	return context;
};
