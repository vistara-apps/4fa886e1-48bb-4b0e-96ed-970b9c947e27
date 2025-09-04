'use client';

import { useState, useCallback } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';

interface ProductUploaderProps {
  onImageUpload: (imageUrl: string) => void;
}

export function ProductUploader({ onImageUpload }: ProductUploaderProps) {
  const [dragOver, setDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const handleDrop = useCallback(async (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      await handleFileUpload(files[0]);
    }
  }, []);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      await handleFileUpload(files[0]);
    }
  };

  const handleFileUpload = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    setUploading(true);

    try {
      // Convert to base64 for demo (in production, upload to Pinata)
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);
        onImageUpload(imageUrl);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const clearImage = () => {
    setUploadedImage(null);
    onImageUpload('');
  };

  if (uploadedImage) {
    return (
      <div className="relative">
        <div className="glass-effect rounded-lg p-4">
          <div className="relative">
            <img
              src={uploadedImage}
              alt="Product"
              className="w-full h-48 object-cover rounded-lg"
            />
            <button
              onClick={clearImage}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-green-400 text-sm mt-2 text-center">
            ✓ Product image uploaded successfully
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`upload-zone glass-effect rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
        dragOver ? 'drag-over' : ''
      }`}
      onDrop={handleDrop}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onClick={() => document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      {uploading ? (
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mb-4"></div>
          <p className="text-white">Uploading...</p>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="bg-purple-500/20 rounded-full p-4 mb-4">
            <Upload className="w-8 h-8 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">
            Upload Product Image
          </h3>
          <p className="text-purple-200 text-sm mb-4">
            Drag and drop your product image here, or click to browse
          </p>
          <div className="flex items-center text-xs text-purple-300">
            <ImageIcon className="w-4 h-4 mr-1" />
            Supports JPG, PNG, GIF up to 10MB
          </div>
        </div>
      )}
    </div>
  );
}
