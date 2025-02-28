import css from './patient-pagination.module.scss';
import { Button } from 'shared/ui/components';

export const PatientPagination = () => {
	return (
		<div className={css['main']}>
			<Button color="white">Предыдущие</Button>
			<div className={css['value']}>Записи 1-10 из 100500</div>
			<Button color="second">Следующие</Button>
		</div>
	);
};
