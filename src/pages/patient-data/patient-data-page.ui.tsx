import css from './patient-data-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { PatientForm } from 'features/patient';
import { useEffect } from 'react';
import { useVoice } from 'app/providers/voice';
import { useAppSelector } from 'shared/lib/store';
import { selectApplicationPhrases } from 'entities/application';

export const PatientDataPage = () => {
	const navigate = useNavigate();
	const phrases = useAppSelector(selectApplicationPhrases);
	const { speak } = useVoice();

	useEffect(() => {
		speak(phrases.examination_start);
	}, [phrases.examination_start, speak]);

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
				label={
					<>
						<p>
							Это нужно для того, чтобы сохранить их в истории исследования или отправить в вашу
							электроннуюмедицинскую карту.
						</p>
						<br />
						<p>
							<b>Пожалуйста, не вставайте на весы до начала измерений.</b>
						</p>
					</>
				}
			/>
			<PatientForm />
		</Container>
	);
};
