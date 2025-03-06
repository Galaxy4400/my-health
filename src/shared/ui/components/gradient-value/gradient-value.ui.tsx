import { hexToGrb } from 'shared/utils';
import css from './gradient-value.module.scss';
import arrow from 'shared/assets/img/arrow.svg';

interface GradientValueProps {
	title: string;
	value: number;
	min: number;
	max: number;
	gradientColors: string[];
}

const getCssGradient = (colors: string[]) => {
	return `linear-gradient(to right, ${colors.join(', ')})`;
};

const getArrowPosition = (value: number, min: number, max: number) => {
	if (value <= min) return 0;
	if (value >= max) return 100;

	return ((value - min) / (max - min)) * 100;
};

const interpolateColor = (value: number, min: number, max: number, colors: string[]): string => {
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

export const GradientValue = ({ title, value, min, max, gradientColors }: GradientValueProps) => {
	return (
		<div className={css['main']}>
			<div className={css['top']} style={{ background: interpolateColor(value, min, max, gradientColors) }}>
				<h5 className={css['title']}>{title}</h5>
				<img
					className={css['arrow']}
					src={arrow}
					alt="arrow"
					style={{ left: `${getArrowPosition(value, min, max)}%` }}
				/>
			</div>
			<div className={css['bottom']} style={{ background: getCssGradient(gradientColors) }}></div>
		</div>
	);
};
