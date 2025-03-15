import { useModal } from 'app/providers/modal';
import { selectPatientData } from 'entities/patient/patient-data';
import { useEffect, useState } from 'react';
import { patientResultsRequest } from 'shared/api/patient';
import { useAppSelector } from 'shared/lib/store';
import { WarningPopup } from 'shared/ui/components';

export const useResults = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isComplete, setIsComplete] = useState(false);
	const { openModal, closeModal } = useModal();
	const patient = useAppSelector(selectPatientData);

	useEffect(() => {
		if (patient.visit_id === null) {
			openModal(<WarningPopup header="Не верный visit_id" onOk={closeModal} />);
			return;
		}

		startResults(patient.visit_id);
	}, [closeModal, openModal, patient.visit_id]);

	useEffect(() => {
		if (!error) return;

		openModal(<WarningPopup header="Ошибка измерения" text={error} onOk={closeModal} />);
	}, [closeModal, error, openModal]);

	const startResults = async (visitId: number) => {
		setError(null);
		setLoading(true);

		try {
			const result = await patientResultsRequest(visitId);

			if (result.status !== 'ok') {
				setError(result.message);

				throw new Error(result.message || 'Неизвестная ошибка');
			} else {
				setIsComplete(true);
			}
		} catch (err) {
			throw new Error(err as string);
		} finally {
			setLoading(false);
		}
	};

	return { startResults, loading, isComplete };
};
