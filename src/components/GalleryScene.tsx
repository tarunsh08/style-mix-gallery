import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';

interface GallerySceneProps {
  artworks: Array<{
    image: string;
    title: string;
    artist: string;
  }>;
}

const GalleryScene = ({ artworks }: GallerySceneProps) => {
  const meshRef = useRef<any>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group>
      {artworks.map((artwork, index) => (
        <mesh key={index} position={[index * 2, 0, 0]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial />
        </mesh>
      ))}
    </group>
  );
};

export default GalleryScene;
