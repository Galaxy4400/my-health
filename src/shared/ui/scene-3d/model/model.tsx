import { useGLTF } from '@react-three/drei';
import { useEffect } from 'react';

export const Model = ({ url }) => {
	const { scene } = useGLTF(url);

	useEffect(() => {
		if (scene) {
			scene.traverse((child) => {
				// Проверяем, если объект это mesh и его имя не "Body"
				if (child.isMesh && child.name !== 'Body') {
					child.visible = false; // Устанавливаем невидимость для всех объектов, кроме "Body"
				}
			});
		}
	}, [scene]);

	return <primitive object={scene} />;
};
