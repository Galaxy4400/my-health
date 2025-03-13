export const toPercentage = (cur: number, total: number) => {
	return Math.min((cur / total) * 100, 100);
};
