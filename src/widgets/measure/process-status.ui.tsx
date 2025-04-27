import css from './process-status.module.scss';
import { MeasureProcessStatus } from 'shared/api/patient';

interface ProcessStatusProps {
	statusData: MeasureProcessStatus;
}

export const ProcessStatus = ({ statusData }: ProcessStatusProps) => {
	return (
		<div className={css['main']}>
			<div className={css['section']}>
				<h2 className={css['title']}>{statusData.title}</h2>
				<p className={css['datetime']}>
					Дата/время: <span>{statusData.datetime}</span>
				</p>
				<p className={css['step']}>
					Текущий шаг: <span>{statusData.step}</span>
				</p>
			</div>
			<div className={css['section']}>
				<h3 className={css['sudtitle']}>{statusData.subtitle}</h3>
				<div className={css['message']} dangerouslySetInnerHTML={{ __html: statusData.message }}></div>
			</div>
			<div
				className={css['progress']}
				style={{ '--progress': `${statusData.percent}%` } as React.CSSProperties}
			>
				<div className={css['progress-value']}>{statusData.percent}%</div>
				<div className={css['progress-bar']}></div>
			</div>
		</div>
	);
};
