/// <reference types="vite/client" />

declare module '*.jpg';
declare module '*.png';
declare module '*.gif';

declare module '*.svg' {
	const content: string;
	export default content;
}

declare module '*.mp4' {
	const src: string;
	export default src;
}

declare module '*.glb' {
	const value: string;
	export default value;
}

declare module '*.module.scss' {
	const classes: { [key: string]: string };
	export default classes;
}

declare module '*.svg?react' {
	const content: React.FC<React.SVGProps<SVGSVGElement>>;
	export default content;
}

declare type RootState = ReturnType<typeof import('../store').store.getState>;
declare type AppDispatch = typeof import('../store').store.dispatch;

interface ImportMetaEnv {
	readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}

declare module 'react-screen-keyboard' {
	import React from 'react';

	interface KeyboardProps {
		inputNode?: HTMLInputElement | null;
		value?: string;
		onClick?: (value: string) => void;
		onChange?: (value: string) => void;
		layouts?: Array<unknown>;
		theme?: string;
	}

	const Keyboard: React.FC<KeyboardProps>;
	export default Keyboard;
}
