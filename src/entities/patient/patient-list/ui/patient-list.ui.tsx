import css from './patient-list.module.scss';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useAppSelector } from 'shared/lib/store';
import { selectPatientList } from '../model';

export const PatientList = () => {
	const navigate = useNavigate();
	const patients = useAppSelector(selectPatientList);

	return (
		<Typography>
			<table className={css['table']}>
				<thead>
					<tr>
						<th>ID</th>
						<th>Дата/Время</th>
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
							<td>{patient.gender}</td>
							<td>{patient.age}</td>
							{/* <td>
								<Button size="small" onClick={() => navigate(path.patientData())}>
									+ Новое
								</Button>
							</td> */}
							<td>
								<Button
									size="small"
									color="second"
									onClick={() => navigate(path.results(), { state: { visit_id: patient.id } })}
								>
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
