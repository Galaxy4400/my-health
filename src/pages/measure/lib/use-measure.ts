import { useState } from 'react';

export const useMeasure = () => {
	const [loading, setLoading] = useState(false);

	const startMeasure = async () => {
		setLoading(true);

		await new Promise((resolve) => setTimeout(resolve, 2000));

		setLoading(false);
	};

	return { startMeasure, loading };
};
