'use client';

import { useState } from 'react';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import { ProductUploader } from './components/ProductUploader';
import { PlatformSelector } from './components/PlatformSelector';
import { AdVariationCard } from './components/AdVariationCard';
import { PerformanceSummary } from './components/PerformanceSummary';
import { Sparkles, Zap, TrendingUp } from 'lucide-react';

export default function Home() {
  const [productImage, setProductImage] = useState<string | null>(null);
  const [selectedPlatform, setSelectedPlatform] = useState<'tiktok' | 'instagram' | null>(null);
  const [adVariations, setAdVariations] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleImageUpload = (imageUrl: string) => {
    setProductImage(imageUrl);
  };

  const handleGenerateAds = async () => {
    if (!productImage || !selectedPlatform) return;

    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-ads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productImageUrl: productImage,
          platform: selectedPlatform,
        }),
      });

      const data = await response.json();
      setAdVariations(data.variations);
    } catch (error) {
      console.error('Error generating ads:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-5xl font-bold text-white">
              AdRemix
            </h1>
          </div>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            AI-powered ad generation that creates viral variations and auto-posts them to social media
          </p>
          <div className="flex justify-center">
            <ConnectWallet />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="glass-effect rounded-lg p-6 card-hover">
            <Sparkles className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">AI Generation</h3>
            <p className="text-purple-200 text-sm">
              Generate multiple ad variations from a single product image using advanced AI
            </p>
          </div>
          <div className="glass-effect rounded-lg p-6 card-hover">
            <Zap className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Auto-Posting</h3>
            <p className="text-purple-200 text-sm">
              Automatically post variations to your connected social media accounts
            </p>
          </div>
          <div className="glass-effect rounded-lg p-6 card-hover">
            <TrendingUp className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-lg font-semibold text-white mb-2">Performance Tracking</h3>
            <p className="text-purple-200 text-sm">
              Monitor which variations perform best with real-time analytics
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="glass-effect rounded-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Create Your Ad Campaign</h2>
          
          {/* Step 1: Upload Product Image */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-white mb-4">1. Upload Product Image</h3>
            <ProductUploader onImageUpload={handleImageUpload} />
          </div>

          {/* Step 2: Select Platform */}
          {productImage && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">2. Select Target Platform</h3>
              <PlatformSelector 
                selected={selectedPlatform}
                onSelect={setSelectedPlatform}
              />
            </div>
          )}

          {/* Step 3: Generate Ads */}
          {productImage && selectedPlatform && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">3. Generate Ad Variations</h3>
              <button
                onClick={handleGenerateAds}
                disabled={isGenerating}
                className="btn-primary px-6 py-3 rounded-lg font-semibold disabled:opacity-50"
              >
                {isGenerating ? 'Generating...' : 'Generate Ads'}
              </button>
            </div>
          )}
        </div>

        {/* Generated Ads */}
        {adVariations.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Generated Ad Variations</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {adVariations.map((variation, index) => (
                <AdVariationCard
                  key={index}
                  variation={variation}
                  platform={selectedPlatform!}
                />
              ))}
            </div>
          </div>
        )}

        {/* Performance Summary */}
        {adVariations.length > 0 && (
          <PerformanceSummary variations={adVariations} />
        )}
      </div>
    </div>
  );
}
