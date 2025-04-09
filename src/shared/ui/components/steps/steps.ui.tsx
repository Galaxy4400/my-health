import { useAppSelector } from 'shared/lib/store';
import css from './steps.module.scss';
import cn from 'classnames';
import { selectApplicationDevices } from 'entities/application';

const getSteps = (hasExam: boolean = true) => {
	return hasExam
		? ['Данные пациента', 'Состав тела и обмен веществ', 'Пульс', 'Давление', 'Опрос', 'Результаты']
		: ['Данные пациента', 'Состав тела и обмен веществ', 'Пульс', 'Давление', 'Результаты'];
};

export const Steps = ({ current }: { current: number }) => {
	const devices = useAppSelector(selectApplicationDevices);

	const steps = getSteps(devices.questionnaire);

	return (
		<div className={cn(css['steps'], devices.questionnaire ? 'exam' : '')}>
			{steps.map((step, i) => (
				<div className={css['step']} key={i}>
					<div className={cn(css['number'], i + 1 <= current ? 'active' : '')}>{i + 1}</div>
					<span className={css['label']}>{step}</span>
				</div>
			))}
		</div>
	);
};
