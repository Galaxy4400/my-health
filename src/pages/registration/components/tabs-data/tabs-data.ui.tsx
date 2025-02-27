import css from './tabs-data.module.scss';
import { ParticipantRegister } from 'features/participant';
import { Tabs, TabsButton, TabsContainer } from 'shared/ui/components';

export const TabsData = () => {
	return (
		<Tabs className={css['tabs']} active={1}>
			<div className={css['buttons']}>
				<TabsButton className={css['button']} index={1}>
					Я ещё не проходил(а) обследование
				</TabsButton>
				<TabsButton className={css['button']} index={2}>
					Я уже проходил(а) обследование
				</TabsButton>
			</div>
			<div className={css['contents']}>
				<TabsContainer className={css['container']} index={1}>
					<ParticipantRegister />
				</TabsContainer>
				<TabsContainer className={css['container']} index={2}>
					content 2
				</TabsContainer>
			</div>
		</Tabs>
	);
};
