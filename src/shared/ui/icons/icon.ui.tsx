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
import { Icons } from 'shared/types';
import { SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
	name?: Icons;
	size?: number;
}

export const Icon = ({ name, className, width = 36, height = 36, ...rest }: IconProps) => {
	switch (name) {
		case Icons.body:
			return <Body className={className} width={width} height={height} {...rest} />;

		case Icons.alarm:
			return <Alarm className={className} width={width} height={height} {...rest} />;

		case Icons.back:
			return <Back className={className} width={width} height={height} {...rest} />;

		case Icons.doc:
			return <Doc className={className} width={width} height={height} {...rest} />;

		case Icons.heart:
			return <Heart className={className} width={width} height={height} {...rest} />;

		case Icons.lock:
			return <Lock className={className} width={width} height={height} {...rest} />;

		case Icons.weight:
			return <Weight className={className} width={width} height={height} {...rest} />;

		case Icons.cross:
			return <Cross className={className} width={width} height={height} {...rest} />;

		case Icons.eye:
			return <Eye className={className} width={width} height={height} {...rest} />;

		case Icons.load:
			return <Load className={className} width={width} height={height} {...rest} />;

		case Icons.exclam:
			return <Exclam className={className} width={width} height={height} {...rest} />;

		default:
			return null;
	}
};
