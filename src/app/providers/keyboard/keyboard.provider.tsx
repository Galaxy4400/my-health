import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { KeyboardContext } from './keyboard.context';
import Keyboard from 'react-screen-keyboard';
import 'react-screen-keyboard/src/Keyboard.css';
import css from './keyboard.module.scss';

export const KeyboardProvider = ({ children }: PropsWithChildren) => {
	const inputRef = useRef<HTMLInputElement | null>(null);
	const [inputNode, setInputNode] = useState<HTMLInputElement | null>(null);

	useEffect(() => {
		setInputNode(inputRef.current);
	}, []);

	return (
		<KeyboardContext.Provider value={null}>
			{children}

			{/* Скрытый инпут для управления клавиатурой */}
			<input ref={inputRef} type="text" style={{ position: 'absolute', opacity: 0 }} />

			{inputNode && (
				<div className={css['keyboard']}>
					<Keyboard inputNode={inputNode} />
				</div>
			)}
		</KeyboardContext.Provider>
	);
};
