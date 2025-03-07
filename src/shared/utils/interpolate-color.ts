import { hexToGrb } from './hex-to-rgb';

export const interpolateColor = (
	value: number,
	min: number,
	max: number,
	colors: string[] | string,
): string => {
	if (!Array.isArray(colors)) return colors;

	const percentage = (value - min) / (max - min);
	const rgbColors = colors.map(hexToGrb);
	const steps = rgbColors.length - 1;

	const index = Math.min(Math.floor(percentage * steps), steps - 1);
	const t = percentage * steps - index;

	const startColor = rgbColors[index];
	const endColor = rgbColors[index + 1];

	const interpolatedColor = startColor.map((start, i) => Math.round(start + (endColor[i] - start) * t));

	return `rgb(${interpolatedColor.join(',')})`;
};
