import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from '../model';

type LocationStateVisit = {
	visit_id: number;
};

export const usePatientId = () => {
	const location = useLocation();
	const patient = useAppSelector(selectPatientData);
	const state = location.state as LocationStateVisit | null;

	return patient.visit_id || state?.visit_id || null;
};
