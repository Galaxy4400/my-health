import css from './start-page.module.scss';
import { Button, Container, IconItem, PulsBtn } from 'shared/ui/components';
import { Icons } from 'shared/types';
import { AdminBtn } from './components';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { useModal } from 'app/providers/modal';

export const StartPage = () => {
	const navigate = useNavigate();
	const { openModal } = useModal();

	const clickHandler = () => {
		openModal(
			<iframe src="https://www.mos.ru/services/zapis-k-vrachu/" width="700px" height="1000px"></iframe>,
		);
	};

	return (
		<Container className={css['container']}>
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
			<div className={css['body']}>
				<div className={css['block']}>
					<PulsBtn className={css['btn']} onClick={() => navigate(path.patientData())}>
						Начать исследование
					</PulsBtn>
					<div className={css['actions']}>
						<AdminBtn />
						<Button className={css['doctor-btn']} onClick={clickHandler}>
							Запись к врачу
						</Button>
					</div>
				</div>
			</div>
		</Container>
	);
};
