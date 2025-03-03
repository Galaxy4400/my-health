import css from './body-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useMeasure } from '../lib';
import img from 'shared/assets/img/measure/man.png';
import { Measure } from 'widgets/measure';

export const BodyPage = () => {
	const navigate = useNavigate();
	const { startMeasure } = useMeasure();

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
					В начало
				</Button>
			</PageHead>
			<Steps current={4} />
			<TitleBlock
				className={css['title']}
				title="Измерение состава тела и обмена веществ"
				label={
					<span>
						Мы используем метод биоимпедансного анализа. Это совершенно безопасно.
						<br />
						Положите ладони на электроды, как показано на рисунке:
					</span>
				}
			/>
			<figure className={css['img']}>
				<img src={img} alt="patient" />
			</figure>
			<Measure action={startMeasure} nextStep={path.cardio()} />
		</Container>
	);
};
