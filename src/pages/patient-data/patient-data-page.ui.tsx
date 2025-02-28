import css from './patient-data-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Spoiler, SpoilerItem, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { TabsData } from './components';
import { PatientNodata } from 'features/patient';

export const PatientDataPage = () => {
	const navigate = useNavigate();
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
				медицинскую карту. Вы можете не указывать свои данные, если не хотите."
			/>
			<Spoiler active={1}>
				<SpoilerItem title="Я укажу свои данные " index={1}>
					<TabsData />
				</SpoilerItem>
				<SpoilerItem title="Я не хочу указывать свои данные" index={2}>
					<PatientNodata />
				</SpoilerItem>
			</Spoiler>
		</Container>
	);
};
