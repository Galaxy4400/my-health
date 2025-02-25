import { ReactNode } from 'react';

interface LoadingComponentProps {
	element: ReactNode;
	fallback: ReactNode;
	loading?: boolean;
}

export const LoadingComponent = ({ element, fallback, loading = true }: LoadingComponentProps) => {
	return loading ? fallback : element;
};
