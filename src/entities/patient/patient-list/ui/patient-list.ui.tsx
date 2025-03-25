import css from './patient-list.module.scss';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Typography } from 'shared/ui/components';
import { path } from 'shared/lib/router';
import { useAppDispatch, useAppSelector } from 'shared/lib/store';
import { fetchGetPatientList, selectPatientList } from '../model';
import { useEffect } from 'react';
import { ckb } from 'date-fns/locale';

export const PatientList = () => {
	const navigate = useNavigate();
	const patients = useAppSelector(selectPatientList);

	console.log(patients);

	return (
		<Typography>
			<table className={css['table']}>
				<thead>
					<tr>
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
