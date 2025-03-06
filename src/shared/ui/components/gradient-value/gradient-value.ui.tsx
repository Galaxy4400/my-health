import css from './gradient-value.module.scss';
import arrow from 'shared/assets/img/arrow.svg';
import { getRelationPercent } from 'shared/utils/get-relation-percent';
import { interpolateColor } from 'shared/utils/interpolate-color';

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

export const GradientValue = ({ title, value, min, max, gradientColors }: GradientValueProps) => {
	return (
		<div className={css['main']}>
			<div className={css['top']} style={{ background: interpolateColor(value, min, max, gradientColors) }}>
				<h5 className={css['title']}>{title}</h5>
				<img
					className={css['arrow']}
					src={arrow}
					alt="arrow"
					style={{ left: `${getRelationPercent(value, min, max)}%` }}
				/>
			</div>
			<div className={css['bottom']} style={{ background: getCssGradient(gradientColors) }}></div>
		</div>
	);
};
