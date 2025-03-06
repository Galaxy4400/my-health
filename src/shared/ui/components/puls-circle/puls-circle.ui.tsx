import css from './puls-circle.module.scss';
import { CSSProperties, HTMLAttributes } from 'react';
import cn from 'classnames';

interface PulsCircleProps extends HTMLAttributes<HTMLDivElement> {
	diameter?: number;
	color?: string;
	title?: string;
	status?: string;
	value?: string;
	fontSize?: number;
}

export const PulsCircle = ({
	diameter,
	fontSize,
	className,
	color,
	title,
	status,
	value,
}: PulsCircleProps) => {
	const style: CSSProperties & { '--color'?: string } = {
		'--color': color,
		width: `${diameter}px`,
		height: `${diameter}px`,
	};

	return (
		<div className={css['puls-circle']} style={style}>
			<div className={cn(css['content'], className)}>
				{title && (
					<h6 className={css['title']} style={{ fontSize: `${fontSize}px` }}>
						{title}
					</h6>
				)}
				{status && (
					<span className={css['status']} style={{ fontSize: `${fontSize}px` }}>
						{status}
					</span>
				)}
				{value && (
					<span className={css['value']} style={{ fontSize: `${fontSize}px` }}>
						{value}
					</span>
				)}
			</div>
		</div>
	);
};
