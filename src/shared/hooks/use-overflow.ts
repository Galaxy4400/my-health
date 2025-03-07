import { useEffect, useRef, useState } from 'react';

export const useOverflow = () => {
	const parentRef = useRef<HTMLDivElement | null>(null);
	const childRef = useRef<HTMLDivElement | null>(null);
	const [isOverflowing, setIsOverflowing] = useState(false);

	useEffect(() => {
		function checkOverflow() {
			if (parentRef.current && childRef.current) {
				setIsOverflowing(childRef.current.offsetHeight > parentRef.current.clientHeight);
			}
		}

		checkOverflow();
		window.addEventListener('resize', checkOverflow);
		return () => window.removeEventListener('resize', checkOverflow);
	}, []);

	return { parentRef, childRef, isOverflowing };
};
