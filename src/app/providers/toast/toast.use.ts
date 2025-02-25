import { useContext } from 'react';
import { ToastFunctionContext, ToastStateContext } from './toast.context';
import { ToastFunctions, ToastState } from './toast.types';

export const useToast = (): ToastFunctions => {
	const context = useContext(ToastFunctionContext);

	if (context === null) {
		throw new Error('useToast must be used within an ToastFunctions');
	}

	return context;
};

export const useToastState = (): ToastState => {
	const context = useContext(ToastStateContext);

	if (context === null) {
		throw new Error('useToastState must be used within an ToastState');
	}

	return context;
};
