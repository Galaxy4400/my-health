import { HTMLAttributes } from 'react';

interface CircleProgressProps extends HTMLAttributes<SVGAElement> {
	value: number;
	size?: number;
}

export const CircleProgress = ({ value, size = 100, className }: CircleProgressProps) => {
	const center = size / 2; // Центр круга
	const radius = size / 2; // Радиус круга
	const angle = (value / 100) * 360; // Угол заполнения
	const radians = (angle - 90) * (Math.PI / 180); // Перевод в радианы (начало сверху)

	// Координаты конца дуги
	const x = center + radius * Math.cos(radians);
	const y = center + radius * Math.sin(radians);

	// Флаг большой дуги (если больше 50%, рисуем большую дугу)
	const largeArcFlag = value > 50 ? 1 : 0;

	// SVG path для заполненного сектора
	const pathData = `
    M${center},${center} 
    L${center},${center - radius} 
    A${radius},${radius} 0 ${largeArcFlag},1 ${x},${y} 
    Z
  `;

	return (
		<svg className={className} width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
			<path d={pathData} fill="currentColor" />
		</svg>
	);
};
