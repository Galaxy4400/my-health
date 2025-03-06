export const getRelationPercent = (value: number, min: number, max: number) => {
	if (value <= min) return 0;
	if (value >= max) return 100;

	return ((value - min) / (max - min)) * 100;
};
