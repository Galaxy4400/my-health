import { useAppDispatch } from 'shared/lib/store';
import { clearPatientData } from '../model';
import { path } from 'shared/lib/router';
import { useNavigate } from 'react-router-dom';

export const useAbortPatient = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const abort = () => {
		dispatch(clearPatientData());

		navigate(path.start());
	};

	return { abort };
};
