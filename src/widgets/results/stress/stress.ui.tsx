import { useAppSelector } from 'shared/lib/store';
import css from './stress.module.scss';
import { GradientValue, MainValue, ResultHead, ValueItem, ValueList } from 'shared/ui/components';
import { PatientModel, selectPatientData } from 'entities/patient/patient-data';

export const Stress = () => {
	const patient = useAppSelector(selectPatientData);

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				{/* <ResultHead patient="Константинопольский К.К. (М)" age="52" /> */}
				<MainValue
					className={css['main-value']}
					title="Стресс:"
					color="#95D665"
					status="Хорошо"
					value="(8/10)"
				/>
				<ValueList>
					<ValueItem title="Оценка стресса:">
						<GradientValue
							title="низкий (2/10)"
							value={2}
							min={0}
							max={10}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="Основной усталости:">
						<GradientValue
							title="низкая (3/10)"
							value={3}
							min={0}
							max={10}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
				</ValueList>
			</div>
			<PatientModel gender={patient.gender} model="brain" />
		</div>
	);
};
