/* eslint-disable no-unused-vars */
import css from './price-range.module.scss';
import cn from 'classnames';
import { useEffect, useRef, useState } from 'react';
import { useClickAway } from '@uidotdev/usehooks';
import { priceFormat } from 'shared/utils';

interface PriceRangeProps {
	lowPrice: number;
	highPrice: number;
	onChange: (value: [number | string, number | string]) => void;
}

export const PriceRange = ({ lowPrice, highPrice, onChange }: PriceRangeProps) => {
	const [display, setDisplay] = useState('');
	const [isActive, setIsActive] = useState(false);
	const clickAwayRef = useClickAway<HTMLDivElement>(() => setIsActive(false));
	const lowInputRef = useRef<HTMLInputElement>(null);

	useEffect(() => {
		const formatDisplay = [
			...(lowPrice ? [priceFormat(lowPrice)] : []),
			...(highPrice ? [priceFormat(highPrice)] : []),
		].join(' - ');

		setDisplay(formatDisplay);
	}, [lowPrice, highPrice]);

	useEffect(() => {
		if (isActive) {
			lowInputRef.current?.focus();
		}
	}, [isActive]);

	return (
		<div className={css['wrapper']} ref={clickAwayRef}>
			<input
				className={css['input']}
				onClick={() => setIsActive(true)}
				type="text"
				value={display}
				readOnly
			/>
			<div className={cn(css['container'], isActive ? 'active' : '')}>
				<label>
					<span className={css['label']}>От</span>
					<input
						className={css['input']}
						type="number"
						value={lowPrice || ''}
						onChange={(e) => onChange([e.target.value, highPrice])}
						ref={lowInputRef}
					/>
				</label>
				<label>
					<span className={css['label']}>До</span>
					<input
						className={css['input']}
						type="number"
						value={highPrice || ''}
						onChange={(e) => onChange([lowPrice, e.target.value])}
					/>
				</label>
			</div>
		</div>
	);
};
