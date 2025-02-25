import { URL } from 'shared/api';

export const getAvatarPlug = (
	string: string | null,
	color = 'ffffff',
	background = '9b5de5',
): URL | undefined => {
	if (!string) return undefined;

	const firstLetter = [...string][0].toUpperCase();

	return `https://ui-avatars.com/api/?name=${firstLetter}&background=${background}&color=${color}`;
};
