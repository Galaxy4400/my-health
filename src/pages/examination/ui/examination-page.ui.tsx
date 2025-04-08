import css from './examination-page.module.scss';
import { selectPatientData, useAbortPatient, usePatientId } from 'entities/patient/patient-data';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { Measure } from 'widgets/measure';
import { API_BASE_URL } from 'shared/api';
import { useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useVoice } from 'app/providers/voice';
import { useAppSelector } from 'shared/lib/store';
import { selectApplicationPhrases } from 'entities/application';

export const ExaminationPage = () => {
	const navigate = useNavigate();
	const { speak } = useVoice();
	const { abort } = useAbortPatient();
	const phrases = useAppSelector(selectApplicationPhrases);
	const patient = useAppSelector(selectPatientData);

	useEffect(() => {
		speak(phrases.examination_examenation);
	}, [phrases.examination_examenation, speak]);

	useEffect(() => {
		const handleMessage = (event: MessageEvent) => {
			if (event.data?.type === 'examenation-finish') {
				navigate(path.results());
			}
		};

		window.addEventListener('message', handleMessage);

		return () => window.removeEventListener('message', handleMessage);
	}, [navigate]);

	if (!patient.visit_id) {
		return <Navigate to={path.start()} />;
	}

	return (
		<Container>
			<PageHead>
				<Button onClick={abort} width="big">
					В начало
				</Button>
			</PageHead>
			<Steps current={5} />
			<TitleBlock
				className={css['title']}
				title="Ответьте на несколько вопросов"
				label="Ваши ответы помогут оценить риски различных заболеваний"
			/>
			<iframe
				src={`${API_BASE_URL}/questions/?visit_id=${patient.visit_id}`}
				width="100%"
				height="700px"
			></iframe>
			<Measure nextStep={path.finish()} />
		</Container>
	);
};
