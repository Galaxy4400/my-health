/* eslint-disable no-unused-vars */
import { Button } from 'shared/ui/components';
import css from './appointment.module.scss';
import { useModal } from 'app/providers/modal';
import { ReactNode } from 'react';

type AppointmentProps = {
	link: string;
	trigger?: (action: () => void) => ReactNode;
};

export const Appointment = ({ link, trigger }: AppointmentProps) => {
	const { openModal } = useModal();

	const action = () => {
		openModal(<iframe src={link} width="950px" height="1000px"></iframe>);
	};

	return trigger ? (
		trigger(action)
	) : (
		<Button className={css['doctor-btn']} onClick={action}>
			Запись к врачу
		</Button>
	);
};
