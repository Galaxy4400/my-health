import css from './measure-page.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Container, PageHead, Steps, TitleBlock } from 'shared/ui/components';
import { path } from 'shared/lib/router';

import img from 'shared/assets/img/measure/man.png';
import { useState } from 'react';

export const MeasurePage = () => {
	const [isComplete, setIsComplete] = useState(false);
	const navigate = useNavigate();

	return (
		<Container>
			<PageHead>
				<Button onClick={() => navigate(path.start())} width="big">
					В начало
				</Button>
			</PageHead>
			<Steps current={2} />
			<TitleBlock
				className={css['title']}
				title="Встаньте, пожалуйста, на весы"
				label="Так, как показано на рисунке. Обувь можно не снимать."
			/>
			<figure className={css['img']}>
				<img src={img} alt="patient" />
			</figure>
			{isComplete ? (
				<p className={css['complete']}>
					<span>Поздравляем!</span>
					<br />
					Измерение успешно завершено. Давайте перейдём к следующему шагу. Нажмите на кнопку:
				</p>
			) : (
				<p className={css['redy']}>Когда будете готовы - нажмите кнопку &quot;Измерить&quot;:</p>
			)}
		</Container>
	);
};
