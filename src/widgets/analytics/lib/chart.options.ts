import { ChartOptions } from 'chart.js';

export const options: ChartOptions<'bar'> = {
	responsive: true,
	aspectRatio: 3,
	plugins: {
		legend: {
			position: 'top' as const,
		},
	},
	scales: {
		y: {
			beginAtZero: true,
			ticks: {
				stepSize: 10000,
				callback: (value) => value.toLocaleString('ru-RU') + ' ₽',
			},
		},
	},
};
