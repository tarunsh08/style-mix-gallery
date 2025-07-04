
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Palette, Wand2, Sparkles } from "lucide-react";

interface StyleSelectorProps {
  originalImage: string;
  onArtGenerated: (artUrl: string) => void;
}

const artStyles = [
  { id: 'vangogh', name: 'Van Gogh', description: 'Post-impressionist style with swirling brushstrokes', color: 'bg-yellow-500' },
  { id: 'picasso', name: 'Picasso', description: 'Cubist geometric forms and bold colors', color: 'bg-blue-500' },
  { id: 'monet', name: 'Monet', description: 'Impressionist light and color techniques', color: 'bg-green-500' },
  { id: 'dali', name: 'Dalí', description: 'Surrealist dreamlike imagery', color: 'bg-purple-500' },
  { id: 'cyberpunk', name: 'Cyberpunk', description: 'Neon-lit futuristic aesthetic', color: 'bg-pink-500' },
  { id: 'anime', name: 'Anime', description: 'Japanese animation style', color: 'bg-red-500' },
];

const StyleSelector = ({ originalImage, onArtGenerated }: StyleSelectorProps) => {
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<{ style: string; url: string }[]>([]);

  const toggleStyle = (styleId: string) => {
    setSelectedStyles(prev => 
      prev.includes(styleId) 
        ? prev.filter(id => id !== styleId)
        : [...prev, styleId]
    );
  };

  const generateArt = async () => {
    if (selectedStyles.length === 0) return;
    
    setIsGenerating(true);
    
    // Simulate AI art generation - in a real app, you'd call Replicate API
    for (const styleId of selectedStyles) {
      await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate API delay
      
      // For demo purposes, we'll use placeholder images with filters
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        
        ctx?.drawImage(img, 0, 0);
        
        // Apply different filters based on style
        if (ctx) {
          switch (styleId) {
            case 'vangogh':
              ctx.filter = 'sepia(0.8) saturate(1.5) hue-rotate(30deg)';
              break;
            case 'picasso':
              ctx.filter = 'contrast(1.5) saturate(0.8) hue-rotate(180deg)';
              break;
            case 'monet':
              ctx.filter = 'blur(1px) opacity(0.9) saturate(1.3)';
              break;
            case 'dali':
              ctx.filter = 'hue-rotate(270deg) saturate(1.8) contrast(1.2)';
              break;
            case 'cyberpunk':
              ctx.filter = 'hue-rotate(300deg) saturate(2) contrast(1.5)';
              break;
            case 'anime':
              ctx.filter = 'saturate(1.8) contrast(1.3) brightness(1.1)';
              break;
          }
          
          ctx.drawImage(img, 0, 0);
        }
        
        const generatedUrl = canvas.toDataURL();
        const styleName = artStyles.find(s => s.id === styleId)?.name || styleId;
        
        setGeneratedImages(prev => [...prev, { style: styleName, url: generatedUrl }]);
        onArtGenerated(generatedUrl);
      };
      
      img.src = originalImage;
    }
    
    setIsGenerating(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-semibold text-white mb-4 flex items-center">
          <Palette className="w-6 h-6 mr-2" />
          Choose Art Styles
        </h3>
        
        <div className="grid grid-cols-2 gap-3 mb-6">
          {artStyles.map((style) => (
            <Card 
              key={style.id}
              className={`cursor-pointer transition-all duration-200 ${
                selectedStyles.includes(style.id)
                  ? 'bg-white/20 border-purple-400 scale-105'
                  : 'bg-white/10 border-white/20 hover:bg-white/15'
              }`}
              onClick={() => toggleStyle(style.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${style.color}`} />
                  <div>
                    <h4 className="text-white font-medium">{style.name}</h4>
                    <p className="text-gray-300 text-sm">{style.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex items-center space-x-4 mb-6">
          <Button 
            onClick={generateArt}
            disabled={selectedStyles.length === 0 || isGenerating}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3"
          >
            {isGenerating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Generating...
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4 mr-2" />
                Generate Art ({selectedStyles.length})
              </>
            )}
          </Button>
          
          {selectedStyles.length > 1 && (
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300">
              <Sparkles className="w-3 h-3 mr-1" />
              Style mixing enabled
            </Badge>
          )}
        </div>
      </div>

      {generatedImages.length > 0 && (
        <div>
          <h4 className="text-xl font-semibold text-white mb-4">Generated Artworks</h4>
          <div className="grid grid-cols-1 gap-4">
            {generatedImages.map((artwork, index) => (
              <Card key={index} className="bg-white/10 border-white/20">
                <CardHeader>
                  <CardTitle className="text-white">{artwork.style} Style</CardTitle>
                </CardHeader>
                <CardContent>
                  <img 
                    src={artwork.url} 
                    alt={`${artwork.style} artwork`}
                    className="w-full rounded-lg shadow-lg"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StyleSelector;
