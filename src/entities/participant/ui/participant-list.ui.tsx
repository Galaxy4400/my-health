import { useNavigate } from 'react-router-dom';
import css from './participant-list.module.scss';
import { Button, Typography } from 'shared/ui/components';
import { path } from 'shared/lib/router';

export const ParticipantList = () => {
	const navigate = useNavigate();

	return (
		<Typography>
			<table className={css['table']}>
				<thead>
					<tr>
						<th>Дата/Время</th>
						<th>Имя</th>
						<th>Возраст</th>
						<th></th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
					<tr>
						<td>01.02.2025</td>
						<td>Константинов Константин Константинович</td>
						<td>52</td>
						<td>
							<Button size="small" onClick={() => navigate(path.registration())}>
								+ Новое
							</Button>
						</td>
						<td>
							<Button size="small" color="second" onClick={() => navigate(path.registration())}>
								Отчёт »
							</Button>
						</td>
					</tr>
				</tbody>
			</table>
		</Typography>
	);
};
