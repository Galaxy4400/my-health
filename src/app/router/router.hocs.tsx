import { Navigate, useLocation } from 'react-router-dom';
import { PropsWithElement } from 'shared/types';
import { path } from 'shared/lib/router';
import { useAuth } from '../providers/auth';

export const ProtectedRoute = ({ element }: PropsWithElement) => {
	const location = useLocation();

	const { authUser } = useAuth();

	return authUser ? element : <Navigate to={path.start()} replace state={{ from: location }} />;
};
