import { useAppSelector } from 'shared/lib/store';
import css from './patient-pagination.module.scss';
import { Button } from 'shared/ui/components';
import {
	selectPatientListLimit,
	selectPatientListPage,
	selectPatientListTotal,
	selectPatientListTotalPages,
} from 'entities/patient/patient-list';
import { useSearchParams } from 'react-router-dom';

export const PatientPagination = () => {
	const [, setSearchParams] = useSearchParams();
	const page = useAppSelector(selectPatientListPage);
	const limit = useAppSelector(selectPatientListLimit);
	const total = useAppSelector(selectPatientListTotal);
	const totalPages = useAppSelector(selectPatientListTotalPages);

	const prev = () => setSearchParams({ page: String(page - 1) });
	const next = () => setSearchParams({ page: String(page + 1) });

	return (
		<div className={css['main']}>
			<Button color="white" onClick={prev} disabled={page === 1}>
				Предыдущие
			</Button>
			<div
				className={css['value']}
			>{`Записи ${page * limit - limit + 1}-${page === totalPages ? total : page * limit} из ${total}`}</div>
			<Button color="second" onClick={next} disabled={page === totalPages}>
				Следующие
			</Button>
		</div>
	);
};
