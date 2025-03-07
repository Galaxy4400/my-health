import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { Model } from '../model';
import model from 'shared/assets/models/man.glb';

export const Scene = () => {
	return (
		<Canvas style={{ height: '553px' }}>
			<PerspectiveCamera makeDefault position={[0, 1, 3]} fov={50} />
			<OrbitControls enableZoom={false} />
			<ambientLight intensity={0.5} />
			<directionalLight position={[2, 5, 2]} intensity={1} />
			<Model url={model} />
		</Canvas>
	);
};
