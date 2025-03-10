import { Sex } from 'shared/api/patient';
import css from './metabolism.module.scss';
import { GradientValue, MainValue, Model3d, ResultHead, ValueItem, ValueList } from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';
import { PatientModel, selectPatientData } from 'entities/patient/patient-data';

export const Metabolism = () => {
	const patient = useAppSelector(selectPatientData);

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead patient="Константинопольский К.К. (М)" age="52" />
				<MainValue
					className={css['main-value']}
					title="Обмен веществ:"
					color="#F9EC5C"
					status="Хорошо"
					value="(7/10)"
				/>
				<ValueList>
					<ValueItem title="ИМТ:">
						<GradientValue
							title="выше нормы (36)"
							value={36}
							min={0}
							max={40}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="Базовый расход калорий:">
						<GradientValue
							title="выше нормы (2611 Kcal)"
							value={2611}
							min={0}
							max={3000}
							gradientColors={['#FD531B', '#FFEA07', '#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
					<ValueItem title="Расчётный возраст тела:">
						<GradientValue
							title="выше нормы (110 кг)"
							value={110}
							min={0}
							max={200}
							gradientColors={['#95D665', '#FFEA07', '#FD531B']}
						/>
					</ValueItem>
				</ValueList>
			</div>
			<PatientModel
				sex={patient.sex}
				model="model"
				colors={
					patient.sex === Sex.man
						? '&highlightParts=Body_red&highlightColor=FF5722&highlightOpacity=1'
						: '&highlightParts=Leg_r_red,Leg_l_red&highlightColor=FF5722&highlightOpacity=1'
				}
			/>
		</div>
	);
};
