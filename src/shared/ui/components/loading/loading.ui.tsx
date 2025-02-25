import css from './loading.module.scss';
import loadingGif from '../../../assets/img/loading.gif';
import { Block } from '../block';

export const Loading = () => {
	return (
		<Block className={css['loading']}>
			<img src={loadingGif} alt="Loading..." />
		</Block>
	);
};
