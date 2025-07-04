import { Canvas, useThree } from '@react-three/fiber';
import { OrbitControls, Text, Html, useTexture } from '@react-three/drei';
import { Suspense } from 'react';
import GalleryScene from './GalleryScene';

interface Gallery3DProps {
  artworks: Array<{
    image: string;
    title: string;
    artist: string;
  }>;
  fullscreen?: boolean;
}

const ArtFrame = ({ position, imageUrl, title }: { position: [number, number, number]; imageUrl: string; title: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <group position={position}>
      {/* Frame */}
      <Box args={[3.2, 2.2, 0.1]} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#8B4513" />
      </Box>
      
      {/* Artwork placeholder - in a real app, you'd load the texture */}
      <Box args={[3, 2, 0.02]}>
        <meshStandardMaterial color="#f0f0f0" />
      </Box>
      
      {/* Title */}
      <Text
        position={[0, -1.5, 0]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {title}
      </Text>
    </group>
  );
};

const GalleryScene = ({ artworks }: { artworks: string[] }) => {
  const positions: [number, number, number][] = [
    [-4, 1, 0],
    [0, 1, 0],
    [4, 1, 0],
    [-4, 1, -8],
    [0, 1, -8],
    [4, 1, -8],
  ];

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />
      
      {/* Gallery floor */}
      <mesh position={[0, -1, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Gallery walls */}
      <mesh position={[0, 3, -10]}>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      <mesh position={[-10, 3, -4]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      <mesh position={[10, 3, -4]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[20, 8]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>
      
      {/* Artworks */}
      {artworks.map((artwork, index) => (
        <ArtFrame
          key={index}
          position={positions[index] || [0, 1, 0]}
          imageUrl={artwork}
          title={`Artwork ${index + 1}`}
        />
      ))}
      
      {/* Default artworks if none uploaded */}
      {artworks.length === 0 && (
        <>
          <ArtFrame position={[-4, 1, 0]} imageUrl="" title="Upload your first artwork" />
          <ArtFrame position={[0, 1, 0]} imageUrl="" title="Transform with AI" />
          <ArtFrame position={[4, 1, 0]} imageUrl="" title="Explore in 3D" />
        </>
      )}
      
      {/* Welcome text */}
      <Text
        position={[0, 4, -5]}
        fontSize={0.8}
        color="#9333ea"
        anchorX="center"
        anchorY="middle"
      >
        Neural Art Gallery
      </Text>
      
      <Text
        position={[0, 3.2, -5]}
        fontSize={0.3}
        color="#e2e8f0"
        anchorX="center"
        anchorY="middle"
      >
        Where AI meets Art
      </Text>
    </>
  );
};

const Gallery3D = ({ artworks, fullscreen = false }: Gallery3DProps) => {
  return (
    <div className={fullscreen ? 'w-full h-full' : 'w-full h-full rounded-2xl overflow-hidden'}>
      <Canvas camera={{ position: [0, 2, 8], fov: 60 }}>
        <Suspense fallback={null}>
          <GalleryScene artworks={artworks} />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minDistance={3}
            maxDistance={15}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Gallery3D;