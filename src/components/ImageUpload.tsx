
import { useState, useCallback } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon } from "lucide-react";

interface ImageUploadProps {
  onImageUpload: (imageUrl: string) => void;
}

const ImageUpload = ({ onImageUpload }: ImageUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setIsUploading(true);
    
    // Simulate file upload - in a real app, you'd upload to a server
    const reader = new FileReader();
    reader.onload = (e) => {
      const imageUrl = e.target?.result as string;
      onImageUpload(imageUrl);
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
  }, [onImageUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  return (
    <Card 
      className={`
        bg-white/10 backdrop-blur-md border-2 border-dashed transition-all duration-300 cursor-pointer
        ${isDragging ? 'border-purple-400 bg-purple-500/20' : 'border-white/30 hover:border-white/50'}
      `}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setIsDragging(true)}
      onDragLeave={() => setIsDragging(false)}
    >
      <CardContent className="p-12 text-center">
        <div className="flex flex-col items-center space-y-6">
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400"></div>
              <p className="text-white text-lg">Processing your image...</p>
            </>
          ) : (
            <>
              <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full">
                {isDragging ? (
                  <Upload className="w-16 h-16 text-purple-400" />
                ) : (
                  <ImageIcon className="w-16 h-16 text-purple-400" />
                )}
              </div>
              
              <div className="space-y-2">
                <h3 className="text-2xl font-semibold text-white">
                  {isDragging ? 'Drop your image here' : 'Upload your image'}
                </h3>
                <p className="text-gray-300">
                  Drag and drop an image file, or click to select
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="file-upload"
              />
              
              <label htmlFor="file-upload">
                <Button 
                  asChild
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-8 py-3"
                >
                  <span>Choose File</span>
                </Button>
              </label>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;
