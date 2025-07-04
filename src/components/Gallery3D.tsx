import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text, Html, useTexture } from '@react-three/drei';
import { Suspense, useState, useEffect } from 'react';
import * as THREE from 'three';

interface ArtFrameProps {
  position: [number, number, number];
  imageUrl: string;
  title: string;
}

const ArtFrame = ({ position, imageUrl, title }: ArtFrameProps) => {
  const texture = useTexture({
    map: imageUrl || '/placeholder.jpg',
  });

  return (
    <group position={position}>
      {/* Frame */}
      <mesh position={[0, 0, -0.05]}>
        <boxGeometry args={[3.2, 2.2, 0.1]} />
        <meshStandardMaterial color="#8B4513" />
      </mesh>
      
      {/* Artwork */}
      <mesh>
        <boxGeometry args={[3, 2, 0.02]} />
        <meshStandardMaterial map={texture.map} />
      </mesh>
      
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

interface GallerySceneProps {
  artworks: string[];
}

const GalleryScene = ({ artworks = [] }: GallerySceneProps) => {
  const positions: [number, number, number][] = [
    [-4, 1, 0], [0, 1, 0], [4, 1, 0],
    [-4, 1, -8], [0, 1, -8], [4, 1, -8]
  ];

  // Filter valid image URLs
  const validArtworks = artworks.filter(url => 
    typeof url === 'string' && 
    (url.startsWith('http') || url.startsWith('data:image') || url.startsWith('/')
  ));

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[0, 10, 0]} intensity={0.5} />
      
      {/* Gallery structure */}
      <mesh position={[0, -1, -4]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>

      {/* Artworks */}
      {validArtworks.map((artwork, index) => (
        <ArtFrame
          key={`artwork-${index}`}
          position={positions[index] || [0, 1, 0]}
          imageUrl={artwork}
          title={`Artwork ${index + 1}`}
        />
      ))}

      {validArtworks.length === 0 && (
        <Text
          position={[0, 0, -5]}
          fontSize={0.5}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          Upload your first artwork
        </Text>
      )}
    </>
  );
};

interface Gallery3DProps {
  artworks?: string[];
  fullscreen?: boolean;
}

const Gallery3D = ({ artworks = [], fullscreen = false }: Gallery3DProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Initializing 3D gallery...</p>
      </div>
    );
  }

  return (
    <div className={fullscreen ? 'w-full h-full' : 'w-full h-full rounded-2xl overflow-hidden'}>
      <Canvas 
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{
          preserveDrawingBuffer: true,
          antialias: true,
          powerPreference: "high-performance"
        }}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-white">Loading 3D assets...</div>
          </Html>
        }>
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