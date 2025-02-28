import css from './tabs-data.module.scss';
import { PatientLogin, PatientRegister } from 'features/patient';
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
					<PatientRegister />
				</TabsContainer>
				<TabsContainer className={css['container']} index={2}>
					<PatientLogin />
				</TabsContainer>
			</div>
		</Tabs>
	);
};
