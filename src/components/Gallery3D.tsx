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

const Gallery3D = ({ artworks, fullscreen = false }: Gallery3DProps ) => {
  return (
    <div className={fullscreen ? 'w-full h-full' : 'w-full h-full rounded-2xl overflow-hidden'}>
      <Canvas 
        camera={{ position: [0, 2, 8], fov: 60 }}
        gl={{ preserveDrawingBuffer: true }}
        onCreated={(state) => state.gl.forceContextRestore()}
      >
        <Suspense fallback={
          <Html center>
            <div className="text-white">Loading gallery...</div>
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