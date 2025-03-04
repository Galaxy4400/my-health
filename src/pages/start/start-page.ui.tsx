import css from './start-page.module.scss';
import { Container, IconItem, PulsBtn } from 'shared/ui/components';
import { Icons } from 'shared/types';
import { AdminBtn } from './components';
import { Banner } from 'shared/ui/components/banner';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';

export const StartPage = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<h3 className={css['title']}>
				Пройдите экспресс-диагностику
				<br />
				вашего организма
				<br />
				за 5 минут
			</h3>
			<div className={css['grid']}>
				<IconItem icon={Icons.body} width={40} height={48}>
					Состав тела
				</IconItem>
				<IconItem icon={Icons.weight} width={40} height={40}>
					Индекс массы тела
				</IconItem>
				<IconItem icon={Icons.alarm} width={40} height={40}>
					Факторы риска
				</IconItem>
				<IconItem icon={Icons.heart} width={36} height={44}>
					Здоровье сердца
				</IconItem>
				<IconItem icon={Icons.back} width={40} height={44}>
					Обмен веществ
				</IconItem>
				<IconItem icon={Icons.doc} width={34} height={42}>
					Рекомендации
				</IconItem>
			</div>
			<PulsBtn onClick={() => navigate(path.patientData())}>Начать</PulsBtn>
			<AdminBtn />
			<Banner url="https://msch9fmba.ru/" />
		</Container>
	);
};
