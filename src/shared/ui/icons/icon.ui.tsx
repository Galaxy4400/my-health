import Body from './svg/body.svg?react';
import Alarm from './svg/alarm.svg?react';
import Back from './svg/back.svg?react';
import Doc from './svg/doc.svg?react';
import Heart from './svg/heart.svg?react';
import Lock from './svg/lock.svg?react';
import Weight from './svg/weight.svg?react';
import Cross from './svg/cross.svg?react';
import Eye from './svg/eye.svg?react';
import Load from './svg/load.svg?react';
import Exclam from './svg/exclam.svg?react';
import Apple from './svg/apple.svg?react';
import Gantel from './svg/gantel.svg?react';
import Brain from './svg/brain.svg?react';
import Chart from './svg/chart.svg?react';
import Spine from './svg/spine.svg?react';
import Circulation from './svg/circulation.svg?react';
import { Icons } from 'shared/types';
import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
	name?: Icons;
	size?: number;
}

export const Icon = ({ name, className, width, height, ...rest }: IconProps) => {
	switch (name) {
		case Icons.body:
			return (
				<Body
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.alarm:
			return (
				<Alarm
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.back:
			return (
				<Back
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.doc:
			return (
				<Doc
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.heart:
			return (
				<Heart
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.lock:
			return (
				<Lock
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.weight:
			return (
				<Weight
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.cross:
			return (
				<Cross
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.eye:
			return (
				<Eye
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.load:
			return (
				<Load
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.exclam:
			return (
				<Exclam
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.apple:
			return (
				<Apple
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.gantel:
			return (
				<Gantel
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.brain:
			return (
				<Brain
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.chart:
			return (
				<Chart
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.spine:
			return (
				<Spine
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		case Icons.circulation:
			return (
				<Circulation
					className={className}
					{...(width !== undefined && { width })}
					{...(height !== undefined && { height })}
					{...rest}
				/>
			);

		default:
			return null;
	}
};
