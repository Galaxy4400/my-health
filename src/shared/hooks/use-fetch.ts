import { useEffect, useState } from 'react';

export const useFetch = <T>(url: string | 'mock', mockData: T) => {
	const [data, setData] = useState<null | T>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchData = async () => {
			try {
				setLoading(true);

				if (url === 'mock') {
					setTimeout(() => {
						setData(mockData);
						setLoading(false);
					}, 500);
					return;
				}

				const response = await fetch(url);

				if (response.ok) {
					const responseData = await response.json();
					setData(responseData);
					setError('');
				} else {
					const errorText = await response.text();
					setError(errorText);
					setData(null);
				}

				setLoading(false);
			} catch (error: unknown) {
				setError(error as string);
				setLoading(false);
				setData(null);
			}
		};

		fetchData();
	}, [mockData, url]);

	return { data, loading, error };
};
