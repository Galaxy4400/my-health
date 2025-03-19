import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { KeyboardContext } from './keyboard.context';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import Keyboard, { NumericLayout, LatinLayout } from 'react-screen-keyboard';
import 'react-screen-keyboard/src/Keyboard.css';
import { useFormContext } from 'react-hook-form';
import { createPortal } from 'react-dom';

export const KeyboardProvider = ({ children }: PropsWithChildren) => {
	const [inputNode, setInputNode] = useState<HTMLInputElement | null>(null);
	const keyboardRef = useRef<HTMLDivElement | null>(null);
	const formContext = useFormContext();

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
		if (!inputNode) return;
		if (!formContext) return;

		const { setValue, trigger } = formContext;

		const handleInput = (event: Event) => {
			const target = event.target as HTMLInputElement;
			setValue(target.name, target.value, { shouldValidate: true, shouldDirty: true });
			trigger(target.name);
		};

		inputNode.addEventListener('input', handleInput);

		return () => {
			inputNode.removeEventListener('input', handleInput);
		};
	}, [formContext, inputNode]);

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
