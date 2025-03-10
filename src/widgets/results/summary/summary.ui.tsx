import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import css from './summary.module.scss';
import { MainValue, PulsCircle, ResultHead, TabsButton } from 'shared/ui/components';
import { useAppSelector } from 'shared/lib/store';

export const Summary = () => {
	const patient = useAppSelector(selectPatientData);

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead patient="Константинопольский К.К. (М)" age="52" />
				<MainValue
					className={css['main-value']}
					valueTitle="Общая оценка:"
					color="#96D665"
					status="Хорошо"
					value="(7/10)"
				/>
				<div className={css['buttons']}>
					<TabsButton className={css['btn']} index={2}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Состав тела:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#96D665" diameter={85} fontSize={18} status="Хорошо" value="(8/10)" />
						</div>
					</TabsButton>
					<TabsButton className={css['btn']} index={3}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Обмен веществ:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#F9EC5C" diameter={85} fontSize={18} status="Средне" value="(6/10)" />
						</div>
					</TabsButton>
					<TabsButton className={css['btn']} index={4}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Стресс:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#96D665" diameter={85} fontSize={18} status="Хорошо" value="(8/10)" />
						</div>
					</TabsButton>
					<TabsButton className={css['btn']} index={5}>
						<div className={css['btn-head']}>
							<h5 className={css['btn-title']}>Сердечно-сосудистая система:</h5>
						</div>
						<div className={css['btn-value']}>
							<PulsCircle color="#F9EC5C" diameter={85} fontSize={18} status="Средне" value="(6/10)" />
						</div>
					</TabsButton>
				</div>
			</div>
			<PatientModel
				sex={patient.sex}
				model="model"
				colors="&highlightParts=Body_red&highlightColor=000&highlightOpacity=1"
			/>
		</div>
	);
};
