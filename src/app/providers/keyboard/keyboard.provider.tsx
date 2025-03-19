import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { KeyboardContext } from './keyboard.context';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Keyboard, { NumericLayout, LatinLayout } from 'react-screen-keyboard';
import 'react-screen-keyboard/src/Keyboard.css';
import { createPortal } from 'react-dom';

export const KeyboardProvider = ({ children }: PropsWithChildren) => {
	const [inputNode, setInputNode] = useState<HTMLInputElement | null>(null);
	const keyboardRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				keyboardRef.current &&
				!keyboardRef.current.contains(event.target as Node) &&
				inputNode &&
				!inputNode.contains(event.target as Node)
			) {
				setInputNode(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [inputNode]);

	useEffect(() => {
		const handleFocus = (event: FocusEvent) => {
			const target = event.target as HTMLElement;

			if (
				(target.tagName === 'INPUT' &&
					['text', 'password', 'email', 'search', 'tel', 'url', 'number'].includes(
						(target as HTMLInputElement).type,
					)) ||
				target.tagName === 'TEXTAREA'
			) {
				setInputNode(target as HTMLInputElement);
			}
		};

		document.addEventListener('focus', handleFocus, true);

		return () => {
			document.removeEventListener('focus', handleFocus, true);
		};
	}, []);

	return (
		<KeyboardContext.Provider value={null}>
			{children}
			{inputNode &&
				createPortal(
					<div className={inputNode.dataset.type === 'number' ? 'numeric-keyboard' : ''} ref={keyboardRef}>
						<Keyboard
							inputNode={inputNode}
							{...(inputNode.dataset.type === 'number' ? { layouts: [NumericLayout] } : {})}
							{...(inputNode.dataset.type === 'email' ? { layouts: [LatinLayout] } : {})}
						/>
					</div>,
					document.getElementById('keyboard')!,
				)}
		</KeyboardContext.Provider>
	);
};
