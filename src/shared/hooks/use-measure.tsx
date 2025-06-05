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

		try {
			const result = await patientMeasureRequest(step, visitId, overide);

			if (result.status !== 'ok') {
				setError(result.message);

				throw new Error(result.message || 'Неизвестная ошибка');
			}

			return result;
		} catch (err) {
			throw new Error(err as string);
		}
	};

	return { startMeasure, error };
};
