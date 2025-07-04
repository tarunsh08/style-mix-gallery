
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Palette, Eye, Sparkles } from "lucide-react";
import Gallery3D from '@/components/Gallery3D';
import ImageUpload from '@/components/ImageUpload';
import StyleSelector from '@/components/StyleSelector';
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [currentView, setCurrentView] = useState<'home' | 'upload' | 'gallery'>('home');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedArt, setGeneratedArt] = useState<string[]>([]);
  const { toast } = useToast();

  const handleImageUpload = (imageUrl: string) => {
    setUploadedImage(imageUrl);
    toast({
      title: "Image uploaded successfully!",
      description: "Choose a style to transform your image.",
    });
  };

  const handleArtGeneration = (artUrl: string) => {
    setGeneratedArt(prev => [...prev, artUrl]);
    toast({
      title: "Art generated!",
      description: "Your masterpiece has been added to the gallery.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-8 h-8 text-purple-400" />
              <h1 className="text-2xl font-bold text-white">Neural Art Gallery</h1>
            </div>
            <div className="flex space-x-4">
              <Button 
                variant={currentView === 'home' ? 'default' : 'ghost'} 
                onClick={() => setCurrentView('home')}
                className="text-white hover:bg-white/20"
              >
                Home
              </Button>
              <Button 
                variant={currentView === 'upload' ? 'default' : 'ghost'} 
                onClick={() => setCurrentView('upload')}
                className="text-white hover:bg-white/20"
              >
                Create
              </Button>
              <Button 
                variant={currentView === 'gallery' ? 'default' : 'ghost'} 
                onClick={() => setCurrentView('gallery')}
                className="text-white hover:bg-white/20"
              >
                Gallery
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {currentView === 'home' && (
          <div className="container mx-auto px-6 py-12">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h2 className="text-6xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Transform Reality into Art
              </h2>
              <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                Upload any image and watch as AI transforms it into stunning artworks. 
                Blend styles, create remixes, and explore your creations in an immersive 3D gallery.
              </p>
              <Button 
                size="lg" 
                onClick={() => setCurrentView('upload')}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-4 text-lg"
              >
                Start Creating
              </Button>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Upload className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Upload & Transform</h3>
                  <p className="text-gray-300">Upload any image and apply AI art styles instantly</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Palette className="w-12 h-12 text-pink-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">Style Remixing</h3>
                  <p className="text-gray-300">Blend multiple art styles for unique creations</p>
                </CardContent>
              </Card>
              
              <Card className="bg-white/10 backdrop-blur-md border-white/20 hover:bg-white/20 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Eye className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-white mb-2">3D Gallery</h3>
                  <p className="text-gray-300">Explore your art in an immersive 3D environment</p>
                </CardContent>
              </Card>
            </div>

            {/* Preview Gallery */}
            <div className="h-96 rounded-2xl overflow-hidden">
              <Gallery3D artworks={generatedArt.map(img => ({
                image: img,
                title: 'Generated Art',
                artist: 'AI'
              }))} />
            </div>
          </div>
        )}

        {currentView === 'upload' && (
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold text-white mb-8 text-center">Create Your Masterpiece</h2>
              
              {!uploadedImage ? (
                <ImageUpload onImageUpload={handleImageUpload} />
              ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-2xl font-semibold text-white mb-4">Your Image</h3>
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded" 
                      className="w-full rounded-lg shadow-lg"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => setUploadedImage(null)}
                      className="mt-4 text-blue-400 border-white/30 hover:bg-white/20"
                    >
                      Upload Different Image
                    </Button>
                  </div>
                  <div>
                    <StyleSelector 
                      originalImage={uploadedImage} 
                      onArtGenerated={handleArtGeneration}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {currentView === 'gallery' && (
          <div className="h-screen">
            <Gallery3D 
            artworks={generatedArt.map(img => ({
              image: img,
              title: 'Generated Art',
              artist: 'AI'
            }))}
            fullscreen 
          />
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
