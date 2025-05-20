import css from './summary.module.scss';
import { PatientModel, selectPatientData } from 'entities/patient/patient-data';
import { Button, Loader, MainValue, PulsCircle, ResultHead, TabsButton } from 'shared/ui/components';
import { patient3dModelRequest, SummaryPageData, patientSummaryRequest } from 'shared/api/patient';
import { ResultPage } from 'shared/types';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'shared/lib/store';
import { useModal } from 'app/providers/modal';
import { API_BASE_URL } from 'shared/api';

const TABS_INDEXES = [
	ResultPage.body,
	ResultPage.metabolism,
	ResultPage.stress,
	ResultPage.cardio,
	ResultPage.spine,
	ResultPage.circulation,
];

export const Summary = () => {
	const [loading, setLoading] = useState(true);
	const [data, setData] = useState<SummaryPageData | null>(null);
	const [modelUrl, setModelUrl] = useState<string | null>(null);
	const patient = useAppSelector(selectPatientData);
	const { openModal } = useModal();

	useEffect(() => {
		patient3dModelRequest(patient.visit_id).then((results) => {
			setModelUrl(results.url);
		});

		setLoading(true);

		patientSummaryRequest(patient.visit_id)
			.then((results) => {
				setData(results);
			})
			.finally(() => setLoading(false));
	}, [patient.visit_id]);

	const reportHandler = () => {
		openModal(
			<iframe
				src={`${API_BASE_URL}/api/reports/report_full_${patient.visit_id}.htm`}
				width="1000px"
				height="1200px"
			></iframe>,
		);
	};

	if (!data || loading) {
		return <Loader isLoading={loading} />;
	}

	console.log(data);

	return (
		<div className={css['main']}>
			<div className={css['info']}>
				<ResultHead />
				<MainValue
					className={css['main-value']}
					valueTitle={data.score.label}
					color={data.score.color}
					status={data.score.title}
					value={data.score.value}
				/>
				<div className={css['buttons']}>
					{data.items.map((item, i) => (
						<TabsButton className={css['btn']} index={TABS_INDEXES[i]} key={i}>
							<div className={css['btn-head']}>
								<h5 className={css['btn-title']}>{item.label}</h5>
							</div>
							<div className={css['btn-value']}>
								<PulsCircle
									color={item.color}
									status={item.title}
									value={item.value}
									diameter={65}
									fontSize={14}
								/>
							</div>
						</TabsButton>
					))}
				</div>
			</div>
			<div className={css['model']}>
				{modelUrl && <PatientModel url={modelUrl} />}
				<Button className={css['report-btn']} color="second" onClick={reportHandler}>
					Показать сводный отчёт
				</Button>
			</div>
		</div>
	);
};
