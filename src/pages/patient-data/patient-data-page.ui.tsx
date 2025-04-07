import css from './patient-data-page.module.scss';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { PatientForm } from 'features/patient';
import { useEffect } from 'react';
import { useVoice } from 'app/providers/voice';
import { useAppSelector } from 'shared/lib/store';
import { selectApplicationPhrases } from 'entities/application';
import { useAbortPatient } from 'entities/patient/patient-data';

export const PatientDataPage = () => {
	const phrases = useAppSelector(selectApplicationPhrases);
	const { speak } = useVoice();
	const { abort } = useAbortPatient();

	useEffect(() => {
		speak(phrases.examination_start);
	}, [phrases.examination_start, speak]);

	return (
		<Container>
			<PageHead>
				<Button onClick={abort} width="big">
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
