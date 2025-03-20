import css from './patient-data-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { PatientForm } from 'features/patient';
import { useEffect } from 'react';
import { useVoice } from 'app/providers/voice';

export const PatientDataPage = () => {
	const navigate = useNavigate();
	const { speak } = useVoice();

	useEffect(() => {
		speak(
			'Укажите свои данные! Это нужно для того, чтобы сохранить их в истории исследования или отправить в вашу электронную медицинскую карту.',
		);
	}, [speak]);

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
					В начало
				</Button>
			</PageHead>
			<Steps current={1} />
			<TitleBlock
				className={css['title']}
				title="Укажите свои данные"
				label="Это нужно для того, чтобы сохранить их в истории исследования или отправить в вашу электронную
				медицинскую карту."
			/>
			<PatientForm />
		</Container>
	);
};
