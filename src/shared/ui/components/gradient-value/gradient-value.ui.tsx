import css from './gradient-value.module.scss';
import arrow from 'shared/assets/img/arrow.svg';
import cn from 'classnames';
import { getRelationPercent, interpolateColor } from 'shared/utils';

interface GradientValueProps {
	title: string;
	value?: number;
	min?: number;
	max?: number;
	gradientColors?: string[] | string;
}

const getCssGradient = (colors: string[]) => {
	return `linear-gradient(to right, ${colors.join(', ')})`;
};

export const GradientValue = ({ title, value = 0, min = 0, max = 0, gradientColors }: GradientValueProps) => {
	const isGradient = Array.isArray(gradientColors) && gradientColors.length > 1;

	return (
		<div className={css['main']}>
			<div
				className={cn(css['top'], !isGradient ? 'full' : '')}
				style={{ background: gradientColors ? interpolateColor(value, min, max, gradientColors) : undefined }}
			>
				<h5 className={cn(css['title'], !isGradient ? 'full' : '', !gradientColors ? 'bold' : '')}>
					{title}
				</h5>
				{isGradient && (
					<img
						className={css['arrow']}
						src={arrow}
						alt="arrow"
						style={{ left: `${getRelationPercent(value, min, max)}%` }}
					/>
				)}
			</div>
			{isGradient && (
				<div className={css['bottom']} style={{ background: getCssGradient(gradientColors) }}></div>
			)}
		</div>
	);
};
