import css from './patient-list.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { selectPatientList } from '../model';
import { useAuth } from 'app/providers/auth';
import { Gender, VisitType } from 'shared/api/patient';
import { setPatientData } from 'entities/patient/patient-data';

export const PatientList = () => {
	const { logout } = useAuth();
	const dispatch = useAppDispatch();
	const navigate = useNavigate();
	const patients = useAppSelector(selectPatientList);

	const toResult = (patient: VisitType) => {
		dispatch(setPatientData(patient));
		navigate(path.results());
		logout();
	};

	return (
		<Typography>
			<table className={css['table']}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Дата/Время</th>
						<th>Пациент</th>
						<th>Пол</th>
						<th>Возраст</th>
						<th></th>
						{/* <th></th> */}
					</tr>
				</thead>
				<tbody>
					{patients.map((patient) => (
						<tr key={patient.id}>
							<td>{patient.id}</td>
							<td>{patient.datetime}</td>
							<td>{patient.visitor_id}</td>
							<td>{patient.gender === Gender.male ? 'Мужской' : 'Женский'}</td>
							<td>{patient.age}</td>
							{/* <td>
								<Button size="small" onClick={() => navigate(path.patientData())}>
									+ Новое
								</Button>
							</td> */}
							<td>
								<Button size="small" color="second" onClick={() => toResult(patient)}>
									Отчёт »
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</Typography>
	);
};
