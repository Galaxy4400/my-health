import css from './page-header.module.scss';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'shared/ui/icons';
import { Icons } from 'shared/types';

interface PageHeaderProps {
	title: string;
}

export const PageHeader = ({ title }: PageHeaderProps) => {
	const navigate = useNavigate();

	return (
		<div className={css['main']}>
			<button className={css['button']} type="button" onClick={() => navigate(-1)}>
				<Icon className={css['icon']} name={Icons.back}></Icon>
				<span>Назад</span>
			</button>
			<h1>{title}</h1>
		</div>
	);
};
