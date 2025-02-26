import css from './participant-search.module.scss';
import { Icon } from 'shared/ui/icons';
import { useState } from 'react';
import { Icons } from 'shared/types';

export const ParticipantSearch = () => {
	const [search, setSearch] = useState('');

	return (
		<div className={css['main']}>
			<h4 className={css['label']}>Поиск по имени:</h4>
			<div className={css['body']}>
				<div className={css['input-wrapper']}>
					<input
						className={css['input']}
						type="text"
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button className={css['clear']} onClick={() => setSearch('')}>
						<Icon name={Icons.cross} width={12} height={12} />
					</button>
				</div>
				<button className={css['btn']}>Искать</button>
			</div>
		</div>
	);
};
