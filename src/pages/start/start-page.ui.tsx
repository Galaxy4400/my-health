import css from './start-page.module.scss';
import { Container, IconItem, PulsBtn } from 'shared/ui/components';
import { Icons } from 'shared/types';
import { useNavigate } from 'react-router-dom';
import { path } from 'shared/lib/router';
import { Appointment } from 'widgets/appointment';
import { AdminEnter } from 'widgets/admin-enter';
import { useAppSelector } from 'shared/lib/store';
import {
	selectApplicationBackgound,
	selectApplicationDoctor,
	selectApplicationPhrases,
} from 'entities/application';
import { useEffect } from 'react';
import { useVoice } from 'app/providers/voice';

export const StartPage = () => {
	const navigate = useNavigate();
	const background = useAppSelector(selectApplicationBackgound);
	const phrases = useAppSelector(selectApplicationPhrases);
	const doctorLink = useAppSelector(selectApplicationDoctor);
	const { speak } = useVoice();

	useEffect(() => {
		speak(phrases.mainscreen_intro);
	}, [phrases.mainscreen_intro, speak]);

	return (
		<div className={css['wrapper']} style={{ background: background.color }}>
			{background.image && (
				<figure className={css['bg']}>
					<img src={background.image} alt="background" />
				</figure>
			)}
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
					<IconItem icon={Icons.spine} width={34} height={42}>
						Здоровье позвоночника
					</IconItem>
					<IconItem icon={Icons.circulation} width={45} height={45}>
						Микроциркуляция
					</IconItem>
				</div>
				<div className={css['body']}>
					<div className={css['block']}>
						<PulsBtn className={css['btn']} onClick={() => navigate(path.patientData())}>
							Начать исследование
						</PulsBtn>
						<div className={css['actions']}>
							<AdminEnter />
							{doctorLink && <Appointment link={doctorLink} />}
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};
