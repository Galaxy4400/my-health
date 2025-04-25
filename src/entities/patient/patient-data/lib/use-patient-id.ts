import { useLocation } from 'react-router-dom';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientData } from '../model';

type LocationStateVisit = {
	visit_id: number;
	visitor_id: number;
};

export const usePatientId = () => {
	const location = useLocation();
	const patient = useAppSelector(selectPatientData);
	const state = location.state as LocationStateVisit | null;

	return {
		visitId: patient.visit_id || state?.visit_id || null,
		visitorId: patient.visitor_id || state?.visitor_id || null,
	};
};
