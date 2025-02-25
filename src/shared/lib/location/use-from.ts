import { useLocation } from 'react-router-dom';

export const useFrom = () => {
	const location = useLocation();

	return location.state?.from;
};
