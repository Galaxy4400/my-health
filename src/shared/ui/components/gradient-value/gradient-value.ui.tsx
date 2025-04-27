import css from './gradient-value.module.scss';
import arrow from 'shared/assets/img/arrow.svg';
import cn from 'classnames';
import { getRelationPercent, interpolateColor } from 'shared/utils';
import { useModal } from 'app/providers/modal';
import { Icon } from 'shared/ui/icons';
import { Icons } from 'shared/types';

interface GradientValueProps {
	title: string;
	value?: number;
	min?: number;
	max?: number;
	gradientColors?: string[] | string;
	historyLink?: string;
}

const API_BASE_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_API_BASE_URL}` : '';

const getCssGradient = (colors: string[]) => {
	return `linear-gradient(to right, ${colors.join(', ')})`;
};

export const GradientValue = ({
	title,
	value = 0,
	min = 0,
	max = 0,
	gradientColors,
	historyLink,
}: GradientValueProps) => {
	const { openModal } = useModal();

	const isGradient = Array.isArray(gradientColors) && gradientColors.length > 1;

	const historyHandler = (url: string) => {
		openModal(<iframe src={`${API_BASE_URL}${url}`} width="800px" height="600px"></iframe>);
	};

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
			{historyLink && (
				<button className={css['chart-btn']} onClick={() => historyHandler(historyLink)}>
					<Icon name={Icons.chart}></Icon>
				</button>
			)}
		</div>
	);
};
