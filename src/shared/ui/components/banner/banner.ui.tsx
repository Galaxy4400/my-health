import css from './banner.module.scss';
import { useModal } from 'app/providers/modal';
import banner from 'shared/assets/img/banner1.jpg';

export const Banner = ({ url }: { url: string }) => {
	const { openModal } = useModal();

	const clickHandler = () => {
		openModal(<iframe src={url} width="100%" height="1000px"></iframe>);
	};

	return (
		<div className={css['main']} onClick={clickHandler}>
			<img src={banner} alt="banner" />
		</div>
	);
};
