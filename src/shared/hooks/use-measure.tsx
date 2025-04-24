import { useModal } from 'app/providers/modal';
import { useEffect, useState } from 'react';
import { Override, patientMeasureRequest } from 'shared/api/patient';
import { WarningPopup } from 'shared/ui/components';

export const useMeasure = () => {
	const [error, setError] = useState<null | string>(null);
	const { openModal, closeModal } = useModal();

	useEffect(() => {
		if (!error) return;

		openModal(<WarningPopup header="Ошибка измерения" text={error} onOk={closeModal} />);
	}, [closeModal, error, openModal]);

	const startMeasure = async (step: number, visitId: number, overide: Override | null = null) => {
		setError(null);

		const result = await patientMeasureRequest(step, visitId, overide);

		return result;
	};

	return { startMeasure, error };
};
